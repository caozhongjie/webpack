const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')
const Webpack = require('webpack')
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    // devtool: 'inline-source-map',
    output: {
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new Webpack.DefinePlugin({
            FILE_URL: '192.1.1'
        }),
    ],
    devServer: {
        devMiddleware: {
            writeToDisk: true
        }
    }
}