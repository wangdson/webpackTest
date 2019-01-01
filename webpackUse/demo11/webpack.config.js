const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //w4不建议使用extract-text-webpack-plugin，建议使用mini-css-webpack-plugin
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
                // use:[
                //     MiniCssExtractPlugin.loader,
                //     {loader:"style-loader"},
                //     {
                //         loader:"css-loader",
                //         options: {
                //             minisize:true
                //         }
                //     }
                // ],
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
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use:[
                    {
                        loader:"url-loader",
                        options: {
                            name:"[name]-[hash:5].min.[ext]",
                            limit:5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath:'fonts/',
                            outputPath:'/fonts/'
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
        }),
        // new MiniCssExtractPlugin({
        //     filename:"[name].min.css"
        // })
    ]
}
