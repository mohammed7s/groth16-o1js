# Mina zkApp: Groth16


Use the o1js fork on this repo: www.github.com/Sulejman/o1js.git
Checkout foreign_ec_ops

New EtherField is defined which defines the bn254 field.


TO DO: 

- Introduce a class that extends Foreign-Field with extentions (quadratic extention) - O1js library to support pairings 
- Pairings library (exponentiation , loop within constraints 2^16) 
- Groth 16 verifier logic 



## How to build

```sh
npm run build
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```

## License

[Apache-2.0](LICENSE)




