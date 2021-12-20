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
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            targets: [
                                'last 1 version',
                                '> 1%'
                            ],
                            useBuiltIns: 'usage',
                            corejs: 3
                        }]],
                    }
                }
            }
        ]
    }
}