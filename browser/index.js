(function(root) {

  'use strict';

  function convertToString(value) {
    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object' && typeof Node === 'function' && value instanceof Node) {
      return value.textContent;
    }

    if (typeof value === 'object' && typeof NodeList === 'function' && value instanceof NodeList) {
      var nodeArray = Array.prototype.slice.call(value);
      var ret = '';
      nodeArray.map(function(val) { ret += val.textContent + ' '; });
      return ret;
    }

    return String(value);
  }

  function reduceWhiteSpace(str) {
    return str.replace(/\s+/g, ' ');
  }

  function normalize(value) {
    var str = convertToString(value);

    return reduceWhiteSpace(str).trim();
  }

  root.normalize = normalize;

})(this);
