const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js', // 入口
    output: { // 出口
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), // 设置绝对路径
        clean: true, // 自动清除上次打包出来的文件
    },
    mode: 'none',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 指定模板
            filename: 'app.html', // 打包出来的静态文件的名字
            inject: 'body' // 把文件打包到body里面
        })
    ]
}