const path = require("path");
const webpack = require("webpack");
module.exports={
    mode:"production",
    entry:{
        app:"./app.js",
    },
    output: {
        publicPath: "dist/",
        filename: "[name].min.js",
        path:path.resolve(__dirname,"dist")
    },
    // devtool: "eval-source-map",//开发调试可用
    resolve: {
        alias: {
            jQuery$:path.resolve(__dirname,"assets/js/jquery.min.js")
        }
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/(node_modules || jquery.min.js)/,
                use:{
                    loader: "babel-loader"
                }
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$":"jQuery",
            "jQuery":'jQuery',
            "window.jQuery":"jQuery"
        })
    ]
}
