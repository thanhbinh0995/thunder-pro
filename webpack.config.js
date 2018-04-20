const polyfill = require('babel-polyfill');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './client/src/index.js'
    ],
    output: {
        path: __dirname + '/client/public/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "#eval-source-map",
    plugins: [
        new HotModuleReplacementPlugin(),
    ],
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
                            plugins: ['react-hot-loader/babel'],
                        },
                    },
                ],
            },
            {test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=1024000'}
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './client/public',
        hot: true,
    }
};