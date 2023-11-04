import {
  Field,
  Bool, 
  SmartContract,
  state,
  State,
  method,
} from 'o1js';

export class Verifier extends SmartContract {
  @state(Field) num = State<Field>();
  @state(Bool) outcome = State<Bool>(); 

  init() {
    super.init(); 
    this.num.set(Field(3));
  }

  @method verifyProof (vk: Field, b:Field) {
    this.outcome.set(vk.equals(b));

  }



}