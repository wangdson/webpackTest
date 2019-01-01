const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PurifyCss = require("purifycss-webpack");
const glob = require('glob-all');

let purifyCss = new PurifyCss({
    paths:glob.sync([
        //要做css tree shaking 的路径地址
        path.resolve(__dirname,"./*.html"),
        path.resolve(__dirname,"./css/*/css")
    ])
})

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
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:{
                        loader:"style-loader"
                    },
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                minimize:true
                            }
                        }
                    ]
                })
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:"[name].min.css",
            allChunks:false
        }),
        purifyCss
    ]
}
