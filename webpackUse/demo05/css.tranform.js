module.exports = function (css) {
    console.log(css);
    // let arr = ["red","green","blue"];
    // setInterval(()=>{
    //     if(css.indexOf("red")>-1)
    //     {
    //         return css.replace("red","green");
    //     }
    //     else if (css.indexOf("green")>-1)
    //     {
    //         return css.replace("green","blue");
    //     }
    //
    // },1000)
    return window.innerWidth<1000?css.replace("red","green"):css;
}
