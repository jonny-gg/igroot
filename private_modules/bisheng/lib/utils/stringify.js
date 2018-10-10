'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function stringify(node) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var indent = '  '.repeat(depth);
  if (Array.isArray(node)) {
    return '[\n' + node.map(function (item) {
      return indent + '  ' + stringify(item, depth + 1);
    }).join(',\n') + '\n' + indent + ']';
  }
  if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null && !(node instanceof Date)) {
    if (node.__BISHENG_EMBEDED_CODE) {
      return node.code;
    }
    return '{\n' + Object.keys(node).map(function (key) {
      var value = node[key];
      return indent + '  "' + key + '": ' + stringify(value, depth + 1);
    }).join(',\n') + '\n' + indent + '}';
  }
  return JSON.stringify(node, null, 2);
};