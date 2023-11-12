import {
  Field,
  Bool,
  SmartContract,
  state,
  State,
  method, ForeignGroup, Circuit, Provable, Struct
} from "o1js";

// export class Verifier extends SmartContract {
//   // @state(Field) num = State<Field>();
//   @state(ForeignGroup) outcome = State<ForeignGroup>();
//
//   //
//   init() {
//     super.init();
//     // this.num.set(Field(3));
//   }
//
//   @method verifyProof(a: ForeignGroup, b: ForeignGroup) {
//     this.outcome.set(a.add(b));
//   }
// }

export class BN254 extends SmartContract {
  // o1js code equivalent to the provided Circom code

  @state(Field) parameter = Field(4965661367192848881n);
  @state(Field) ate_loop_count = Field(29793968203157093288n);
  // @state(Array<number>) pseudo_binary_encoding = [
  //   0, 0, 0, 1, 0, 1, 0, -1, 0, 0, 1, -1, 0, 0, 1, 0,
  //   0, 1, 1, 0, -1, 0, 0, 1, 0, -1, 0, 0, 0, 0, 1, 1,
  //   1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, 1,
  //   1, 0, 0, -1, 0, 0, 0, 1, 1, 0, -1, 0, 0, 1, 0, 1, 1
  // ] as Array<number>;

  @method get_bn254_prime(n: Field, k: Field) {
    let firstCondition = (n.equals(51)).and(k.equals(5));
    let secondCondition = (n.equals(43)).and(k.equals(6));

    class Fields6 extends Struct({
      fields: [Field, Field, Field, Field, Field, Field]
    }) {
    }

    let p = Provable.switch([Bool(firstCondition), Bool(secondCondition)], Fields6,
      [
        {
          fields: [
            Field(154029749239111),
            Field(612489067865988),
            Field(1694766016103850),
            Field(22935798733632),
            Field(851317936231194),
            Field(0)
          ]
        },
        {
          fields: [
            Field(4496167861575),
            Field(6843252835345),
            Field(7000891737505),
            Field(3140707462190),
            Field(3410247779588),
            Field(415682586050)
          ]
        }
      ]
    );
    return p;
  }

// Additional functions like find_Fp2_product and find_Fp2_inverse need to be implemented

}