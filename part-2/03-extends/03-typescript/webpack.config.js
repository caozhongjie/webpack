const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/app.ts', // 入口
    mode: 'development', // 设置成开发环境
    output: { // 出口
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), // 设置绝对路径
        clean: true, // 自动清除上次打包出来的文件    
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'] // 不写文件名时优先找ts文件
    }
}