
var before = exports.before = function (base) {

if (!base.builder        ) base.builder        = {};
if (!base.proto          ) base.proto          = {};
if (!base.proto._default ) base.proto._default = {};

base.proto._default.unbuild = function (buildName, indent, loc) {
    var props = [];
    var node = this;
    Object.keys(this).forEach(function (key) {
        var item = node[key];
        if (typeof item !== 'function' && key !== 'type' && (loc || key !== 'loc') && key !== 'parent') {
            props.push(
                item && item.unbuild ? item.unbuild(buildName, indent+"  ", loc) :
                Array.isArray(item)  ? "["+item.map(function (el){
                                           return el && el.unbuild ?
                                              el.unbuild(buildName, indent+"  ", loc) :
                                              JSON.stringify(item);
                                       }).join(", ")+"]" :
                                       JSON.stringify(item)
            );
        }
    });
    var join = props.length > 1 || Array.isArray(this[Object.keys(this)[0]]);
    return buildName+'.'+(this.type[0].toLowerCase()+this.type.slice(1))+"("+(join ? "\n"+indent+'  ': '')+
          props.join(",\n"+indent+"  ") +
          (join ? "\n"+indent: '')+")";
};

if (!base.proto.objectExpression) base.proto.objectExpression = {};
base.proto.objectExpression.unbuild = function (buildName, indent, loc) {
    var props = [];
    var node = this;
    this.properties.forEach(function (prop) {
        props.push("{\n"+indent+'  key: '+prop.key.unbuild(buildName, indent+"  ", loc)+",\n"+indent+"  "+
            "kind: \""+prop.kind+"\",\n"+indent+"  " +
            "value: "+ prop.value.unbuild(buildName, indent+"  ", loc)+"}")
    });
    var join = props.length > 1;
    return buildName+'.'+(this.type[0].toLowerCase()+this.type.slice(1))+"(["+(join ? "\n"+indent+'  ': '')+
          props.join(",\n"+indent+"  ") +
          (loc ? ",\n"+indent+"  "+JSON.stringify(this.loc) : '') +
          (join ? "\n"+indent: '')+"])";
};

return base;
};

var after = exports.after = function (base) { return base; };

exports.wrap = function (fun) {
    return fun ?
        function (base) { return after(fun(before(base))); } :
        function (base) { return after(before(base)); };
};

