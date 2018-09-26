const igroot = require('./components');
const req = require.context('./components', true, /^\.\/locale-provider\/.+_.+\.tsx$/);

igroot.locales = {};

req.keys().forEach((mod) => {
  const match = mod.match(/\/([^/]+).tsx$/);
  igroot.locales[match[1]] = req(mod).default;
});

module.exports = igroot;
