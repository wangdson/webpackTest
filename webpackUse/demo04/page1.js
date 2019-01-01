require.include("./module.js");

var pageA = require("./pageA.js");
var pageB = require("./pageB.js");
console.log(pageA,pageB);

require.ensure(
    ['./pageA.js','./pageB.js'],// js文件或模块名
    function (require) {
        var pageA = require("./pageA.js");
        var pageB = require("./pageB.js");
        console.log(pageA,pageB);
    },
    "page" //chunkname
);

require.ensure(
    ["lodash"],
    function (require) {
        var _ = require("lodash");
        var sum = _.join([1,2]);
        console.log(sum);
    },
    "lodash"
);

export default "page1";
