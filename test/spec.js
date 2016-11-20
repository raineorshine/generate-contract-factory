const fs = require('fs')
const path = require('path')
const chai = require('chai')
const spawn = require('spawn-please')
const generateFactory = require('../')
const chaiAsPromised = require("chai-as-promised")
const should = chai.should()
chai.use(chaiAsPromised)

const src = fs.readFileSync(path.join(__dirname, 'test.sol'), 'utf-8')
const expectedOutput = `pragma solidity ^0.4.4;

import './MyContract.sol';

contract MyContractFactory {
  function create(uint a, uint b) public returns(address) {
    return address(new MyContract(a, b));
  }
}`

const ctorSrc = fs.readFileSync(path.join(__dirname, 'test-no-ctor.sol'), 'utf-8')
const ctorExpectedOutput = `pragma solidity ^0.4.4;

import './MyContract.sol';

contract MyContractFactory {
  function create() public returns(address) {
    return address(new MyContract());
  }
}`

describe('generate-contract-factory', () => {

  it('should generate a factory', () => {
    generateFactory(src).should.equal(expectedOutput)
  })

  it('should generate a factory when there is no constructor', () => {
    generateFactory(src).should.equal(expectedOutput)
  })

  it('should read files from stdin', () => {
    return spawn('node', ['bin.js'], ctorSrc).should.eventually.equal(ctorExpectedOutput + '\n')
  })

})
