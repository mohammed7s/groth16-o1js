import {
  Field,
  Bool,
  SmartContract,
  state,
  State,
  method, ForeignGroup
} from "o1js";

export class Verifier extends SmartContract {
  // @state(Field) num = State<Field>();
  @state(ForeignGroup) outcome = State<ForeignGroup>();
  //
  init() {
    super.init();
    // this.num.set(Field(3));
  }

  @method verifyProof (a: ForeignGroup, b:ForeignGroup) {
    this.outcome.set(a.add(b));
  }
}