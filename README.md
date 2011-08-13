An AST-to-source-code serializer for [reflect.js](https://github.com/zaach/reflect.js).

# Tree Builder
The tree builder creates default nodes extended with properties and methods for traversing and manipulating the tree.


Example:

    var Reflect = require('reflect');
    var unbuilder = require('reflect-unbuilder');

    var source = "a + b + c(5)";
    var ast = Reflect.parse(source, {builder: unbuilder});

    console.log(ast.unbuild("builder", '', false));

    /* Output:
    builder.program(
      [ builder.expressionStatement(builder.binaryExpression(
          "+",
          builder.binaryExpression(
            "+",
            builder.identifier("a"),
            builder.identifier("b")
          ),
          builder.callExpression(
            builder.identifier("c"),
            [ builder.literal(5) ]
          )
        )) ]
    )
    */

The output tries to be somewhat readable. Reformat at will.


## Node Properties
See the [Mozilla](https://developer.mozilla.org/en/SpiderMonkey/Parser_API#Node_objects) documentation for the default node APIs. The following are additional properties provided by unbuilder.

### node.unbuild(builderName, indent, includeLocationFlag)
* The serialized builder constructors will use `builderName` as the builder object.
* `indent` is the initial indentation level.
* `includeLocationFlag` determines if location data is included in the serialization.

# License

MIT X License
