const $ = require('dekko');

$('dist')
  .isDirectory()
  .hasFile('igroot.css')
  .hasFile('igroot.min.css')
  .hasFile('igroot.js')
  .hasFile('igroot.min.js');

// eslint-disable-next-line
console.log('`dist` directory is valid.');

