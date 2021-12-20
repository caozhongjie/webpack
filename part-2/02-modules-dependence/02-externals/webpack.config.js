const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './app.js',
    plugins: [
        new HtmlWebpackPlugin()
    ],
    externalsType: 'script',
    externals: {
        jquery: [
            'https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js',
            '$'
        ]
    }
}