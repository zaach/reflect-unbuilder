var Reflect = require('reflect');
var unbuilder = require('reflect-unbuilder');

var source = "a + b + c(5)";
var ast = Reflect.parse(source, {builder: unbuilder});

console.log(ast.unbuild("builder", '', false));
