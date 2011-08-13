var base  = require("reflect-builder").wrapper;
var un = require("./un");

// extend the base builder then define builder methods on exports
un.wrap(
  base.wrap()
)({builder: exports});

// allow other builder "middleware" to compose with this one
exports.wrapper = un;
