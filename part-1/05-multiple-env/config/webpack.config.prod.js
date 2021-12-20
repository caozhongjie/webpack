const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    output: { // 出口
        filename: 'script/[name].[contenthash].js',
        publicPath: 'http://localhost:8080/'
    },
    mode: 'production', // 设置成开发环境

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
}
