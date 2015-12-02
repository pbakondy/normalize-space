# normalize-space [![Build Status](https://travis-ci.org/pbakondy/normalize-space.svg?branch=master)](https://travis-ci.org/pbakondy/normalize-space)

Converts anything to string with normalized form. JavaScript equivalent of XSLT normalize-space()

## Install

```
$ npm install --save normalize-space
```

## Usage

The function first converts any incoming value to string then converts all the whitespace characters to a single space.

It works the same way as [XSLT normalize-space()](http://www.saxonica.com/html/documentation/functions/fn/normalize-space.html).

If the incoming parameter is a <code>Node</code> ( result of [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) ) or a <code>NodeList</code> ( result of [Document.querySelectorAll()](https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll) ) the module also converts it to string and normalizes its content.

### Usage with Node.js

```js
var normalize = require('normalize-space');

normalize('  a   \n\n\n    a  ');
//=> 'a a'
```

### Usage with browser

Use the browser-specific file:

```html
<script src="normalize-space/browser/index.js" type="text/javascript"></script>

<script>
  console.log(window.normalize('  a   \n\n\n    a  ')); //=> 'a a'
</script>
```

## License

normalize-space is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
