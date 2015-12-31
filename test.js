'use strict';

var jsdom = require('jsdom');
var window = jsdom.jsdom().defaultView;
var document = window.document;
var Node = window.Node;

var test = require('tape');
var normalize = require('./');

test('value to string', function (t) {
  t.equal(normalize(null), 'null', 'convert null to string');
  t.equal(normalize(undefined), 'undefined', 'convert undefined to string');
  t.equal(normalize(false), 'false', 'convert boolean to string');
  t.equal(normalize(0), '0', 'convert number to string');
  t.equal(normalize(NaN), 'NaN', 'convert NaN to string');
  t.equal(normalize('abc'), 'abc', 'string is string');
  t.equal(normalize([]), '', 'convert array to string using Array.prototype.toString()');
  t.equal(normalize([1, 2, 3]), '1,2,3', 'convert array to string using Array.prototype.toString()');
  t.equal(normalize({}), '[object Object]', 'convert object to string using Object.prototype.toString()');
  t.equal(normalize({ a: 1, b: 'b' }), '[object Object]', 'convert object to string using Object.prototype.toString()');
  t.end();
});

test('Node to string', function (t) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode('Test'));

  t.equal(normalize(div), 'Test', 'convert Node to string');

  var el = document.createElement('p');
  el.appendChild(document.createTextNode('Test'));
  div.appendChild(el);

  t.equal(normalize(div), 'TestTest', 'convert Node to string');

  t.end();
});

test('NodeList to string', function (t) {
  var el = document.createElement('p');
  el.appendChild(document.createTextNode('Test'));

  var el2 = document.createElement('p');
  el2.appendChild(document.createTextNode('Test'));

  var div = document.createElement('div');
  div.appendChild(el);
  div.appendChild(el2);

  var nl = div.querySelectorAll('p');

  t.equal(normalize(nl), 'Test Test', 'convert NodeList to string');

  t.end();
});

test('normalize space', function (t) {
  t.equal(normalize(' '), '', 'trim');
  t.equal(normalize(' a'), 'a', 'trim');
  t.equal(normalize('a '), 'a', 'trim');
  t.equal(normalize(' a '), 'a', 'trim');

  t.equal(normalize('a a'), 'a a', 'whitespace');
  t.equal(normalize('a\na'), 'a a', 'whitespace');
  t.equal(normalize('a\ta'), 'a a', 'whitespace');
  t.equal(normalize('a\ra'), 'a a', 'whitespace');

  t.equal(normalize('a  a'), 'a a', 'strip space');
  t.equal(normalize('a       a'), 'a a', 'strip space');
  t.equal(normalize('a   \n\n\n    a'), 'a a', 'strip space');
  t.equal(normalize('   a       a   '), 'a a', 'strip space');

  t.end();
});
