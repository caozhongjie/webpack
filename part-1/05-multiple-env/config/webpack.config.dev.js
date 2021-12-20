module.exports = {
    output: { // 出口
        filename: 'script/[name].js',
    },
    mode: 'development', // 设置成开发环境
    devtool: 'inline-source-map', // 用于设置精准定位错误位置 并且会格式化打包生成的Js文件
    devServer: {
        static: './dist'
    },
}