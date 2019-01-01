const path = require("path");

module.exports={
    mode:"development",
    entry:{
        // page:"./page.js",
        page1:"./page1.js",
    },
    output: {
        publicPath: __dirname+"/dist/",
        filename: "[name].min.js",
        path:path.resolve(__dirname,"dist")
    },
    devtool: "eval-source-map",//开发调试可用
    optimization: {
        splitChunks: {
            // maxAsyncRequests: 5,//按需加载的代码块（vendor-chunk）并行请求的数量小于或等于5个
            // maxInitialRequests: 3,//初始加载的代码块，并行请求的数量小于或者等于3个
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common:{
                    name:"common",
                    chunks: "all",
                    minSize:2,
                    priority:0,
                },
                // 首先: 打包node_modules中的文件
                vendor:{
                    name:"vendor",
                    test:/[\\/]node_modules[\\/]/,
                    chunks: "all",
                    minSize:2,
                    priority:10
                }
            }
        }
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader: "babel-loader"
                }
            }
        ]
    }
}
