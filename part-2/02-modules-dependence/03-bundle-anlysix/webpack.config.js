const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')
module.exports = {
    entry: {
        app: './src/app.js',
        app2: './src/app2.js',
    }, 
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
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        static: './dist'
    },
    // // 定义模块资源
    // module: {
    //     // type用于定义转换类型
    //     rules: [
    //         // 将.jpg文件转换成链接形式
    //         {
    //             test: /\.jpg$/,
    //             type: 'asset/resource',
    //             generator: {
    //                 // filename: 'images/text.jpg' // 这个优先级比assetModuleFilename更高
    //                 filename: 'images/[contenthash][ext]' // 这个优先级比assetModuleFilename更高
    //             }
    //         },
    //         {
    //             test: /\.svg$/,
    //             type: 'asset/inline', // 将svg格式装换成base64的文件格式，并且不会在dist打包文件中生成
    //         },
    //         {
    //             test: /\.txt$/,
    //             type: 'asset/source' // 可以导出文件源代码
    //         },
    //         {
    //             test: /\.png/,
    //             type: 'asset' // 设置通用文件资源类型。默认大小是8k,超出这个文件就会生不会生成base64文件，否则就会打包到dist文件中。这个默认大小可以修改，通过parser下面的MaxSize
    //         }
    //     ]
    // }
}