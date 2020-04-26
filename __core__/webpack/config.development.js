/*
    __core__/webpack/config.common

    config for dev environtment only
    see: https://webpack.js.org/configuration/

    input: regenerator-runtime, webpack-hot-middleware, src/__app__/client
    plugins:
        - hot module, hot reload on browser
*/

const { HotModuleReplacementPlugin } = require('webpack')
const path = require('path')

const { appDir } = require('./dirs')

const webpackConfigs = {
    mode: 'development',
    entry: {
        bundle: [
            'regenerator-runtime/runtime',
            'webpack-hot-middleware/client',
            path.join(appDir, 'client'),
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ],
    devtool: 'eval',
}

module.exports = webpackConfigs
