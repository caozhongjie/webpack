const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    // devtool: 'inline-source-map',
    output: {
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    module: {
        rules: [
            {
                test: require.resolve('./src/index.js'),
                use: 'imports-loader?wrapper=window'
            },
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
            }
        ]
    }
}