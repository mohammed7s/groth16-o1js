import {
  Field,
  Bool,
  SmartContract,
  state,
  State,
  method, EtherField
} from "o1js";
import { ForeignGroup } from "../build/src/o1js/src/lib/elliptic-curve";

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