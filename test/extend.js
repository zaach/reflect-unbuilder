var builder = require('../lib/builder');
var assert = require('assert');

var Reflect = require('reflect');

var ast = Reflect.parse('4 + 5', {builder: builder});

var str = Reflect.stringify(ast);
var ev = '';

eval('ev = '+ast.unbuild("builder",'',false));

assert.equal(str, Reflect.stringify(ev));
