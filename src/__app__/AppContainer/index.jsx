/*
    src/__app__/AppContainer

    App container
    wrap all components, containers, and routes

    display error on making request to GitHub server

    trigger the callback function anytime the path changed and before loading the route
    defined in route config of the component "routes > Component > index"
*/

import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useHistory } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'

import routes from '~/routes'
import Header from '~/containers/Header'
import Footer from '~/containers/Footer'
import { CDN_MATERIALUI_ICONS, CDN_GOOGLE_FONT_STYLES } from '~/variables/urls'
import useStore, { SET_ERROR } from '~/store'
import Dialog from '~/components/Dialog'

import useStyle from './style'

const AppContainer = () => {
    const classes = useStyle()

    const { pathname, state } = useLocation()
    const history = useHistory()
    const store = useStore()

    useEffect(() => {
        matchRoutes(routes, pathname).forEach(async ({ route, match }) => {
            window.scrollTo(0, 0)
            if (route.exact && route.loadData && !(state && state.preventLoadData)) {
                await route.loadData(store, { route, match })
            }

            // immediately set preventLoadData to false after route loaded
            if (route.exact && state && state.preventLoadData) {
                history.replace({
                    pathname,
                    state: { ...state, preventLoadData: false }
                })
            }
        })
    }, [pathname])

    const { error } = store.state

    const _closeError = () => {
        store.actions({ type: SET_ERROR, payload: {} })
    }

    return (
        <>
            <Helmet>
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon-16x16.png" />

                <link rel="stylesheet" href={CDN_GOOGLE_FONT_STYLES} />
                <link rel="stylesheet" href={CDN_MATERIALUI_ICONS} />
            </Helmet>

            <Header />
            <div className={classes.content}>{renderRoutes(routes)}</div>
            <Footer />

            <Dialog onClose={_closeError} open={error && error.statusCode}>
                <p>{error ? 'Oops.. Something went wrong' : ''}</p>
                {error ? <small>{error.message}</small> : null}
            </Dialog>
        </>
    )
}

export default AppContainer
