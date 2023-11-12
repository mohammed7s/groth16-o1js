import { BN254 } from './Verifier.js';
import {
  Field,
  Mina,
  PrivateKey,
  AccountUpdate, EtherField, ForeignField, ForeignGroup
} from 'o1js';

import * as assert from "assert";

const useProof = false;

const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];

// Create a public/private key pair. The public key is your address and where you deploy the zkApp to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

const bnInstance = new BN254(zkAppAddress);
const bnDeployTxn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  bnInstance.deploy();
});
await bnDeployTxn.sign([deployerKey, zkAppPrivateKey]).send();

const txn2 = await Mina.transaction(senderAccount, () => {
  bnInstance.get_bn254_prime(Field(51n), Field(5n));
});
await txn2.prove();
await txn2.sign([senderKey]).send();
