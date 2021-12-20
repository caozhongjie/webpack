const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './app.js',
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
        hot: true
    },
    module: {
        rules: [
            {

                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
}