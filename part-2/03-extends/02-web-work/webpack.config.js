const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.js', // 入口
    mode: 'development', // 设置成开发环境
    plugins: [
        new HtmlWebpackPlugin()
    ],
    // 定义模块资源
}