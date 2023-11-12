import {
  Field,
  Bool,
  SmartContract,
  state,
  State,
  method, ForeignGroup, Circuit, Provable, Struct, EtherField
} from "o1js";

export class Verifier extends SmartContract {
  @state(ForeignGroup) outcome = State<ForeignGroup>();

  @method verifyProof(a: ForeignGroup, b: ForeignGroup) {
    // TODO
    this.outcome.set(a.add(b));
  }
}

export class BN254 extends SmartContract {
  // o1js code equivalent to the provided Circom code

  @state(EtherField) parameter = new EtherField(4965661367192848881n);
  @state(EtherField) ate_loop_count = new EtherField(29793968203157093288n);
  // @state(Array<number>) pseudo_binary_encoding = [
  //   0, 0, 0, 1, 0, 1, 0, -1, 0, 0, 1, -1, 0, 0, 1, 0,
  //   0, 1, 1, 0, -1, 0, 0, 1, 0, -1, 0, 0, 0, 0, 1, 1,
  //   1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, 1,
  //   1, 0, 0, -1, 0, 0, 0, 1, 1, 0, -1, 0, 0, 1, 0, 1, 1
  // ] as Array<number>;

  @method get_bn254_prime(n: EtherField, k: EtherField) {
    let firstCondition = (n.equals(51)).and(k.equals(5));
    let secondCondition = (n.equals(43)).and(k.equals(6));

    class Fields6 extends Struct({
      fields: [EtherField, EtherField, EtherField, EtherField, EtherField, EtherField]
    }) {
    }

    let p = Provable.switch([Bool(firstCondition), Bool(secondCondition)], Fields6,
      [
        {
          fields: [
            new EtherField(154029749239111),
            new EtherField(612489067865988),
            new EtherField(1694766016103850),
            new EtherField(22935798733632),
            new EtherField(851317936231194),
            new EtherField(0)
          ]
        },
        {
          fields: [
            new EtherField(4496167861575),
            new EtherField(6843252835345),
            new EtherField(7000891737505),
            new EtherField(3140707462190),
            new EtherField(3410247779588),
            new EtherField(415682586050)
          ]
        }
      ]
    );
    return p;
  }

// Additional functions like find_Fp2_product and find_Fp2_inverse need to be implemented

}