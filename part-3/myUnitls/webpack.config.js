const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'myUnitls.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
        library: {
            name: 'webpackUntils',
            type: 'umd'
        },
        globalObject: 'globalThis'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]

}