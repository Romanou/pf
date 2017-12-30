const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin('../styles/app.css');
const webpack = require("webpack");
const config = require('./config');

module.exports = {
    entry : ['./dev/js/main.js','./dev/sass/main.scss'],
    watch : true,
    output : {
        path : path.resolve('app/assets/js/'),
        filename : 'app.js'
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /(node_modules|bower_components)/,
                use : {
                    loader : 'babel-loader'
                }
            },
            {
                test : /\.scss$/,
                use : extractSass.extract({
                    use : [{
                        loader : "css-loader",
                        options : {
                            minimize : true
                        }
                    }, {
                        loader : "sass-loader"
                    }],
                    fallback : "style-loader"
                })
            },
            {
                test : /\.vue$/,
                loader : 'vue-loader'
            }

        ]
    },
    plugins: [
        extractSass,
        new webpack.optimize.UglifyJsPlugin({minimize: config.env === 'production'})
    ]
};