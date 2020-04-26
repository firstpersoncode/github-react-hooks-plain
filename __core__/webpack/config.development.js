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
