const SolidityParser = require('solidity-parser')

module.exports = (src, options = {}) => {
  const ast = SolidityParser.parse(src)

  // get pragma statement
  const pragma = ast.body.find(statement => statement.type === 'PragmaStatement')
  const pragmaSrc = pragma ? src.slice(pragma.start, pragma.end) + '\n' : ''

  // get contract name
  const contract = ast.body.find(statement => statement.type === 'ContractStatement')

  // extract constructor params
  const constructor = contract.body ? contract.body.find(statement => statement.name === contract.name) : null

  const params = constructor ? constructor.params
    .map(param => src.slice(param.start, param.end))
    .join(', ') : ''
  const args = constructor ? constructor.params
    .map(param => param.id)
    .join(', ') : ''

  return `${pragmaSrc}
import './${contract.name}.sol';

contract ${contract.name}Factory {
  function create(${params}) public returns(address) {
    return address(new ${contract.name}(${args}));
  }
}`
}
