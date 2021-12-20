const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
module.exports = {
    entry: './src/index.js',
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            name: 'search', // 名称
            filename: 'remoteEntry.js', // 远端仓库文件
            remotes: {
                nav: 'nav@http://localhost:3003/remoteEntry.js', // nav文件配置中定义的名字
                home: 'home@http://localhost:3001/remoteEntry.js'
            },
            exposes: {},
            shared: {} // 共享的第三方包
        })
    ]
}