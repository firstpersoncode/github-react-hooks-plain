/*
    src/__app__/server

    Pass the React component string, html string and the react-router context to server side using "server" function
    see: https://medium.com/spreetail-engineering/approaching-server-side-rendering-in-an-existing-react-redux-application-2c403819a231

    import "server" function that will return the instance of the express app.

    Wrap the react app with helmet provider for setting header from the component
    see: https://www.npmjs.com/package/react-helmet

    Wrap the react app with react router provider app navigation
    see: https://www.npmjs.com/package/react-router-dom

    Wrap the react app with context provider for global state management
    see: https://reactjs.org/docs/context.html

    Wrap the react app with loadable provider for reporting which modules were rendered.
    since we use code splitting.
    see: https://github.com/jamiebuilds/react-loadable#loadablecapture

    Run the app when all modules resolved
    see: https://github.com/jamiebuilds/react-loadable#loadablepreloadall
*/

import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Capture, preloadAll } from 'react-loadable'
import { getBundles } from 'react-loadable-ssr-addon'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'
import server from '__core__/server'

import { PATH_ROOT } from '~/variables/urls'
import routes from '~/routes'
import { extractHostName } from '~/utils/string'
import { Context, useConfigStore } from '~/store'

import App from './AppContainer'

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const manifest = require('../../dist/react-loadable-ssr-addon.json')

const modules = new Set()

const ContextProvider = ({ children }) => {
    const store = useConfigStore()
    return <Context.Provider value={store}>{children}</Context.Provider>
}

const app = server({
    routes,
    rootPath: PATH_ROOT,
    render: async (expressCtx) => {
        const { req } = expressCtx

        const routeCtx = { status: null, url: null }
        const helmetCtx = { helmet: {} }

        const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)])

        const { helmet } = helmetCtx

        const root = renderToString(
            <Capture report={(moduleName) => modules.add(moduleName)}>
                <HelmetProvider context={helmetCtx}>
                    <StaticRouter location={req.url} context={routeCtx}>
                        <ContextProvider>
                            <App />
                        </ContextProvider>
                    </StaticRouter>
                </HelmetProvider>
            </Capture>
        )

        const html = `<!doctype html>
            <html lang="en">
                <head>
                    ${helmet.title ? helmet.title.toString() : ''}
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    ${[
                        helmet.meta ? helmet.meta.toString() : '',
                        helmet.link ? helmet.link.toString() : '',
                        helmet.script ? helmet.script.toString() : ''
                    ]
                        .filter((s) => s !== '')
                        .join('\n')}
                    <link href="/css/index.css" rel="stylesheet" />
                </head>
                <body>
                    <div id="root">${root}</div>

                    ${
                        bundles.js && bundles.js.length
                            ? bundles.js
                                  .map((script) => `<script src="/${process.env.APP_NAME}/${script.file}"></script>`)
                                  .join('\n')
                            : ''
                    }

                </body>
            </html>`

        return { html, routeCtx }
    }
})

preloadAll().then(() => {
    const HOST = extractHostName(process.env.APP_HOST || 'http://localhost')
    const PORT = Number(process.env.APP_PORT) || 3000
    const httpServer = app.listen(PORT, HOST, (error) => {
        if (error) {
            /* eslint-disable-next-line no-console */
            console.error(error)
        } else {
            const address = httpServer.address()
            /* eslint-disable-next-line no-console */
            console.info(`==> 🌎 Listening on PORT: ${address.port}. Open up ${HOST}:${address.port}/ in your browser.`)
        }
    })
})
