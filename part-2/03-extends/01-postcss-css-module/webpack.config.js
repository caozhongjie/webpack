const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    entry: './src/app.js',
    // output: { // 出口
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname, './dist'), // 设置绝对路径
    //     clean: true, // 自动清除上次打包出来的文件
    //     // assetModuleFilename: 'images/test.jpg', // 定义静态资源打包的文件路径和文件名
    //     assetModuleFilename: 'images/[contenthash][ext]', // 根据文件内容自动生成一个hash扩展值文件名
    // },
    mode: 'development', // 设置成开发环境
    devtool: 'inline-source-map', // 用于设置精准定位错误位置 并且会格式化打包生成的Js文件
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        static: './dist'
    },
    // 定义模块资源
    module: {
        // type用于定义转换类型
        rules: [
            {
                test: new RegExp(`^(?!.*\\.global).*\\.css`),
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules:true,
                            localIdenName: '[hash:base64:6]'
                        }
                    }
                ],
                exclude: [path.resolve(__dirname, '..', 'node_modules')]
            },
            // 普通模式
            {
                test: new RegExp(`^(.*\\.global).*\\.css`),
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    }
                ],
                exclude: [path.resolve(__dirname, '..', 'node_modules')]
            },
            // 将.jpg文件转换成链接形式
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', {
            //         loader: 'css-loader',
            //         options: {
            //             modules: true
            //         }
            //     }, 'postcss-loader']
            // },
        ]
    }
}