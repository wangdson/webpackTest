const path = require("path");

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

        ]
    },
    plugins: [
    ]
}
