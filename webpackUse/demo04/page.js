import (/* webpackChunkName : 'pageA' */ "./pageA.js").then(function (pageA) {
    console.log(pageA);

})

import (/* webpackChunkName : "pageB" */ './pageB.js').then(function (val) {
    console.log(val);
})

import (/* webpackChunkName : "lodash" */ 'lodash').then(function (_l) {
    console.log(_l.default.join(["wang","pei"]));
})
console.log("this is a page");
export default "page";
