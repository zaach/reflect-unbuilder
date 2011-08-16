#!/usr/bin/env node

var sys = require("sys");
var path = require("path");
var builder = require("../lib/builder");
var Reflect = require("reflect");

var source = read(process.argv[2]);
var ast = Reflect.parse(source, {builder: builder, loc: false});

sys.puts(ast.unbuild('b', '', false));

function read (path) {
    return require("fs").readFileSync(require("path").resolve(path), "utf8");
}
