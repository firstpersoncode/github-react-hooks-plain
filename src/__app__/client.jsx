/*
    src/__app__/client

    Hydrate the react dom

    All components will be splitted (code splitting) and will have its own chunk file,
    hence, we need to use preloadReady before rendering the App
    this way, the app will be rendered when the modules are ready.
    see: https://github.com/jamiebuilds/react-loadable#preloading-ready-loadable-components-on-the-client

    Wrap the react app with helmet provider for setting header from the component
    see: https://www.npmjs.com/package/react-helmet

    Wrap the react app with react router provider app navigation
    see: https://www.npmjs.com/package/react-router-dom

    Wrap the react app with context provider for global state management
    see: https://reactjs.org/docs/context.html

    accept hot reload on dev environtment
*/

import React, { useEffect } from 'react'
import { hydrate } from 'react-dom'
import { preloadReady } from 'react-loadable'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import { Context, useConfigStore } from '../store'

import App from './AppContainer'

const targetDom = document.querySelector('#root')

const render = (App) => () => {
    const store = useConfigStore()

    return (
        <HelmetProvider>
            <BrowserRouter>
                <Context.Provider value={store}>
                    <App />
                </Context.Provider>
            </BrowserRouter>
        </HelmetProvider>
    )
}

export const bootstrap = () => {
    const Render = render(App)

    hydrate(<Render />, targetDom)

    if ((process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') && module.hot) {
        module.hot.accept('./AppContainer', () => {
            const Render = render(require('./AppContainer').default)
            hydrate(<Render />, targetDom)
        })
    }
}

preloadReady().then(bootstrap)
