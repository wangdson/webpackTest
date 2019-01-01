const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
/*********** sprites config ***************/
let spritesConfig = {
    spritePath:'./dist/static'
}
/******************************************/

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
                        },
                        /******************* sprites loader ***********************/
                        {
                            loader:"postcss-loader",
                            options:{
                                ident:"postcss",
                                plugins:[require("postcss-sprites")(spritesConfig)]
                            }
                        }
                        /******************************************/
                    ]
                })
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            name:"[name]-[hash:5].min.[ext]",
                            limit:100,//size<20K
                            publicPath:'static/',
                            outputPath:'/static/'
                        }
                    },
                    {
                        loader: "img-loader",
                        options: {
                            plugins:[
                                require('imagemin-mozjpeg')({
                                    quality:80
                                })
                            ]
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:"[name].min.css",
            allChunks:false
        })
    ]
}
