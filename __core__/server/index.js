/*
    __core__/server

    Initiate the express instance
    see: https://www.npmjs.com/package/express

    export the instance to be used in the src/__app__/server

    @param {Object} configs - config for rendering the React component
    @param {string} configs.rootPath - variable to be used for the base path of the app
    @param {Function({ req, res })} configs.render - function that will return the string of React component
    @param {Array} configs.routes - array of react-router config

    path to dist folder: /_mrk
    path to static folder: /

    Use webpack middleware on dev environtment
    see: https://webpack.js.org/
*/

import path from 'path'

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import render from './render'

const app = express()

/* ========================= Initial Configs ========================= */
app.use(express.static(path.resolve(process.cwd(), 'static')))
app.use(`/${process.env.APP_NAME}/`, express.static(path.resolve(process.cwd(), 'dist')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* ========================= Dev Server & Configs ========================= */
const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'

if (isDev) {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')

    const config = require('__core__/webpack')
    const compiler = webpack(config)

    app.use((_, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        next()
    })

    app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }))
    app.use(webpackHotMiddleware(compiler))
    app.use(morgan('dev'))
}

export default (configs) => {
    const { rootPath, render: renderApp, routes } = configs
    app.get(rootPath + '*', render({ render: renderApp, routes }))

    return app
}
