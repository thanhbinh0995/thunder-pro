const polyfill = require('babel-polyfill');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

module.exports = {
    entry: [
        'babel-polyfill',
        './client/src/index.js'
    ],
    output: {
        path: __dirname + '/client/public/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "eval",
    plugins: [
        new HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.css$/, loaders: [ 'style-loader', 'css-loader'] },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=1024000' }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        "alias": {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './client/public',
        hot: true,
    }
};