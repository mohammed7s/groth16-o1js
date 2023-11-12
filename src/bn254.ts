import {
    Field,
    Bool,
    SmartContract,
    state,
    State,
    method, 
    ForeignGroup, 
    Circuit, 
    Provable,
    Struct
  } from "o1js";
import {ForeignField } from "./foreign_field";

  export class bn254 extends SmartContract {
    @state (Field)curve_order = Field(21888242871839275222246405745257275088548364400416034343698204186575808495617);
    @state (Field) field_modulus = Field(21888242871839275222246405745257275088696311157297823662689037894645226208583); 
    fq2_coeffs = (1, 0)
    fq12_coeffs = (82, 0, 0, 0, 0, 0, -18, 0, 0, 0, 0, 0)

    @method check1 () {
      return this.curve_order; 
    }
    //  (Field(2) ** this.curve_order) % this.curve_order == Field(2) ;  
    //}
    //@method check2 () {
    // Assuming curve_order and field_modulus are already defined BigInts
    //}

    bn128_FQ = new ForeignField (this.field_modulus)
    bn128_FQP = new ForeignField (field_modulus)
    bn128_FQ2 = new ForeignField (field_modulus, fq2_coeffs)
    bn128_FQ12 = new ForeignField (field_modulus,fq12_coeffs)

    



  }
