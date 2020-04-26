import React from 'react'
import { Route } from 'react-router'

const RenderStatus = ({ children, status }) => {
    const render = (route) => {
        if (route.staticContext) {
            route.staticContext = Object.assign(route.staticContext, { status })
        }

        return children
    }

    return <Route render={render} />
}

export default RenderStatus
