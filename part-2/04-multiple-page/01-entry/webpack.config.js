const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'sharedLo'
        },
        another: {
            import: './src/another-modules.js',
            dependOn: 'sharedLo' 
        },
        sharedLo: 'lodash'
    }
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index1.html',  // 依据哪个模板来生成
            filename: 'index1.html', // 生成的文件名
            chunks: ['index', 'sharedLo'] // 该页面分别引入哪些上面的chunk
        }),
        new HtmlWebpackPlugin({
            template: 'index2.html', // 依据哪个模板来生成
            filename: 'index2.html', // 生成的文件名
            chunks: ['another', 'sharedLo'] // 该页面分别引入哪些上面的chunk
        }),
    ],
}