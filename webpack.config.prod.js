const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const DotENV = require('dotenv');
const polyfill = require('babel-polyfill');
DotENV.config();
const publicUrl = process.env.PUBLIC_URL || 'dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/public/index.html',
    filename: 'index.html',
    inject: 'body'
});
const fs = require('fs-extra');
fs.emptyDir(`./client/${publicUrl}`);
const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './client/src/index.js'
    ],
    output: {
        path: __dirname + `/client/${publicUrl}/`,
        publicPath: `/${publicUrl}/`,
        filename: '[hash].bundle.js',
        chunkFilename: "[id].[hash].bundle.js"
    },
    devtool: "#eval-source-map",
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'client/src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', {modules: false}],
                                'react',
                                'stage-2',
                            ],
                        },
                    },
                ],
            },
            { test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.css$/, loaders: [ 'style-loader', 'css-loader'] },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=1024000' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ //<--key to reduce React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        HtmlWebpackPluginConfig
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './client',
        disableHostCheck: true
    }
};