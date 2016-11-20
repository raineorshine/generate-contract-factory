# generate-contract-factory
[![npm version](https://img.shields.io/npm/v/generate-contract-factory.svg)](https://npmjs.org/package/generate-contract-factory)

Generates a factory contract in Solidity that instantiates a given contract and returns its address. Use in combination with [generate-contract-interface](https://github.com/raineorshine/generate-contract-interface) to reduce deployment bytecode.

## Install

```sh
$ npm install --save generate-contract-factory
```

## CLI Usage

```js
$ generate-contract-factory < MyContract.sol > MyContractFactory.sol
```

## API Usage

```js
const generateFactory = require('generate-contract-factory')

const src = `pragma solidity ^0.4.4;

contract MyContract {
  uint _a;
  uint _b;
  function MyContract(uint a, uint b) {
    _a = a;
    _b = b;
  }
}`

console.log(generateFactory(src))

/* Output:

pragma solidity ^0.4.4;

import './MyContract.sol';

contract MyContractFactory {
  function create(uint a, uint b) public returns(address) {
    return address(new MyContract(a, b));
  }
}
*/

```

## Issues

Before reporting, please makes sure your source is parseable via [solidity-parser](https://github.com/ConsenSys/solidity-parser).

## License

ISC © [Raine Revere](https://github.com/raineorshine)
