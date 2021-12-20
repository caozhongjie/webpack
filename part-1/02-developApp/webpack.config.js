const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: './src/index.js', // 入口
    output: { // 出口
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), // 设置绝对路径
        clean: true, // 自动清除上次打包出来的文件
        // assetModuleFilename: 'images/test.jpg', // 定义静态资源打包的文件路径和文件名
        assetModuleFilename: 'images/[contenthash][ext]', // 根据文件内容自动生成一个hash扩展值文件名
    },
    mode: 'production', // 设置成开发环境
    devtool: 'inline-source-map', // 用于设置精准定位错误位置 并且会格式化打包生成的Js文件
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 指定模板
            filename: 'app.html', // 打包出来的静态文件的名字
            inject: 'body' // 把文件打包到body里面
        }),
        new MinCssExtractPlugin({
            filename: 'styles/[contenthash].css'
        })
    ],
    devServer: {
        static: './dist'
    },
    // 定义模块资源
    module: {
        // type用于定义转换类型
        rules: [
            // 将.jpg文件转换成链接形式
            {
                test: /\.jpg$/,
                type: 'asset/resource', // 可以生成一个单独的资源，他是一个文件路径
                generator: {
                    // filename: 'images/text.jpg' // 这个优先级比assetModuleFilename更高
                    filename: 'images/[contenthash][ext]' // 这个优先级比assetModuleFilename更高
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline', // 将svg格式装换成base64的文件格式，并且不会在dist打包文件中生成
            },
            {
                test: /\.txt$/,
                type: 'asset/source' // 导出资源的源代码
            },
            // {
            //     type: 'asset' // 通用资源类型，在resource和inline之间自动选择，选择依据是资源的大小， 默认的是8Kb
            // }
            {
                test: /\.(css|less)$/,
                use: [MinCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime'
                            ]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 300000000
    }
}