var fp = require("path")
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var config = require("./config")(process.argv);

module.exports = {
    entry: {
        app: "./src/app.js",
        vendor: [
            "vue",
            "vue-router",
            "vuex"
        ]
    },
    output: {
        path: __dirname + '/public/assets',
        publicPath: '/public/assets/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor'
        })
        /*,
         new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false
         }
         })
         */
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|otf|woff2|woff|ttf)(\?.*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(json)$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.html', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devtool: 'cheap-source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: { hints: false }
};
