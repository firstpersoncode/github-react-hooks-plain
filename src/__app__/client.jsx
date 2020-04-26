import React, { useEffect } from 'react'
import { hydrate } from 'react-dom'
import { preloadReady } from 'react-loadable'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import App from '~/containers/App'

import { Context, useConfigStore } from '../store'

const targetDom = document.querySelector('#root')

const render = (App) => () => {
    const handleDeleteStyleSSR = () => {
        const styleSSR = document.querySelector('#style-server-side')
        if (styleSSR) {
            const parent = styleSSR.parentNode
            parent.removeChild(styleSSR)
        }
    }

    useEffect(() => {
        handleDeleteStyleSSR()
    }, [])

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

preloadReady()
    .then(() => {
        const Render = render(App)

        hydrate(<Render />, targetDom)

        if ((process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') && module.hot) {
            module.hot.accept('~/containers/App', () => {
                const Render = render(require('~/containers/App').default)
                hydrate(<Render />, targetDom)
            })
        }
    })
    .catch((err) => {
        /* eslint-disable-next-line no-console */
        console.log(err)
    })
