import { Verifier } from './Verifier.js';
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

const aField = new EtherField(21888242871839275222246405745257275088696311157297823662689037894645226208583n);
const bField = new EtherField(21888242871839275222246405745257275088696311157297823662689037894645226208583n);

// [a: string, b: string, modulus: string, genX: string, genY: string, order: string];
ForeignGroup.curve = ["0x0", "0x2", "0x2523648240000001BA344D80000000086121000000000013A700000000000013", "0x2523648240000001BA344D80000000086121000000000013A700000000000012", "0x1", "0x2523648240000001BA344D8000000007FF9F800000000010A10000000000000D"];
let left = new ForeignGroup(new EtherField(4) as ForeignField, new EtherField(1) as ForeignField);
let right = new ForeignGroup(new EtherField(0) as ForeignField, new EtherField(3) as ForeignField);
let expected = new ForeignGroup(new EtherField(1) as ForeignField, new EtherField(2) as ForeignField);

// Create a public/private key pair. The public key is your address and where you deploy the zkApp to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

// create an instance of Square - and deploy it to zkAppAddress
const zkAppInstance = new Verifier(zkAppAddress);
const deployTxn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
});
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

// Transaction calling the function verifyProof
const txn1 = await Mina.transaction(senderAccount, () => {
  zkAppInstance.verifyProof(left, right);
}); 
await txn1.prove(); 
await txn1.sign([senderKey]).send();

console.log("outcome: ", zkAppInstance.outcome.get().toString());

// const returnedField = zkAppInstance.outcome.get();
// const expectedField = new EtherField(16n)
// console.log(returnedField.assertEquals(expectedField));

const addition = zkAppInstance.outcome.get();
console.log(addition);
console.log(expected);

expect(addition).toEqual(expected);
