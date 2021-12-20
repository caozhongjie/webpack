const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/app.js',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        // 如果引入的时候文件名可以不写，先匹配json, 然后是js, vue
        extensions: ['.json', 'js', '.vue'] 
    }
}