import { Verifier } from './Verifier.js';
import {
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
} from 'o1js';

const useProof = false;

const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];


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

// get the initial state of Square after deployment
const num0 = zkAppInstance.num.get();
console.log('state after init:', num0.toString());

const vk = 4; 
console.log('vk input:', vk.toString()); 


// Transaction calling the function verifyProof
const txn1 = await Mina.transaction(senderAccount, () => {
  zkAppInstance.verifyProof(Field(4), Field(4)); 
}); 
await txn1.prove(); 
await txn1.sign([senderKey]).send();
const result = zkAppInstance.outcome.get().toBoolean(); 
console.log('outcome of proof:', result)