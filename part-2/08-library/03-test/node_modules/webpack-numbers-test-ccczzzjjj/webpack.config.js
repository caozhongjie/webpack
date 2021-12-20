const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const path = require('path')
module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'webpack-numbers.js',
        library: {
            name: 'webpackNumbers', // 这样这个文件就不会被treeShaking
            type: 'umd',  // window  commongjs 
        },
        globalObject: 'globalThis'
    },
    // externals: {
    //     lodash: {
    //         commonjs: 'lodash',
    //         commonjs2: 'lodash',
    //         amd: 'lodash',
    //         root: '_'
    //     }
    // }
}