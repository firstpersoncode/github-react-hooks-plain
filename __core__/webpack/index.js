/*
    __core__/webpack

    File to send Webpack configuration
    see: https://webpack.js.org/configuration/

    use deepmerge to merge common config and environtment config
    see: https://www.npmjs.com/package/deepmerge
*/


require('dotenv').config()
const deepmerge = require('deepmerge')
const common = require('./config.common')
const webpackConfigs = require(`./config.${process.env.NODE_ENV || 'production'}`)

const configs = deepmerge(common, webpackConfigs, {
    arrayMerge: (dest, src) => [...dest, ...src],
})

module.exports = configs
