import './scss/base.scss'

import 'style-loader/lib/addStyles'
import 'css-loader/lib/css-base'

var loaded = false;
window.addEventListener('click',function () {
    if(!loaded)
    {
        import(/* webpackChunkName:'style' */'./scss/common.scss').then(_=>{
            console.log("change background===");
            loaded = true;
        })
    }
    else
    {
        import(/* webpackChunkName:'change' */"./scss/change.scss").then(_=>{
            console.log("change loader====");
            loaded = false;
        })
    }
})
