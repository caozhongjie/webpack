const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container


module.exports = {
    entry: './src/index.js',
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            name: 'nav', // 名称
            filename: 'remoteEntry.js', // 远端仓库文件
            remotes: {},
            exposes: { // 暴露给别的组件使用
                './Header': './src/Header.js'
            },
            shared: {} // 共享的第三方包
        })
    ]
}