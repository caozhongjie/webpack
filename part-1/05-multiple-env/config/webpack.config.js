const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.config.common')

const productionConfig = require('./webpack.config.prod')
const developmentConfig = require('./webpack.config.dev')

module.exports = (env) => {
    console.log('asdasdasd', env)
    if (env.production) {
        console.log('当前是生产模式')
        return merge(commonConfig, productionConfig)
    }
    if(env.development) {
        console.log('当前是开发模式')
        return merge(commonConfig, developmentConfig)
    }
    return new Error('no match configuration was found')
}