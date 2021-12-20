const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const path = require('path')
module.exports = {
    entry: './src/index.js',
    mode: 'production',
    // devtool: 'inline-source-map',
    // experiments: {
    //     outputModule: true 
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'mylib.js',
        library: {
            name: 'mylib', // 这样这个文件就不会被treeShaking
            type: 'umd',  // window  commongjs 
        },
        globalObject: 'globalThis'
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
}