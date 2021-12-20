const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./app.js',
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,  // 该属性用于配置是否在服务器端进行代码压缩,服务器在代码传输到浏览器中数据是压缩了的。提升传输效率
        port: 3000,
        // headers: { // 设置响应头信息
        //     'X-Access-Token': 'abc123'
        // },
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://localhost:9000'
        },
        // https: true
        http2: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
}