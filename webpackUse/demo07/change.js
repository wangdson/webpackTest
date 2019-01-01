import "./scss/base.scss"

import common from "./scss/common.css"
import change from './scss/change.css'

var loaded = false;
window.addEventListener("click",function () {
    if(!loaded)
    {
        common.use();
        change.unuse();
        loaded = true;
    }
    else
    {
        common.unuse();
        change.use();
        loaded = false;
    }
})
