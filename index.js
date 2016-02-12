'use strict';

var jsdom = require('jsdom');
var window = jsdom.jsdom().defaultView;
var Node = window.Node;
var NodeList = window.NodeList;

function getTextContent(value) {
  return value.textContent;
}

function convertToString(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object' && typeof Node === 'function' && value instanceof Node) {
    return getTextContent(value);
  }

  if (typeof value === 'object' && typeof NodeList === 'function' && value instanceof NodeList) {
    var nodeArray = Array.prototype.slice.call(value);
    return nodeArray.map(getTextContent).join(' ');
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

module.exports = normalize;
