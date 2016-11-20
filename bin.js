const generateFactory = require('./')
const stdin = require('get-stdin-promise')

stdin
  .then(generateFactory)
  .then(console.log)
