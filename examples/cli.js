#!/usr/bin/env node

var util = require('util');
var path = require("path");
var builder = require("../lib/builder");
var Reflect = require("reflect");

var source = read(process.argv[2]);
var ast = Reflect.parse(source, {builder: builder, loc: false});

util.puts(ast.unbuild('b', '', false));

function read (path) {
    return require("fs").readFileSync(require("path").resolve(path), "utf8");
}
