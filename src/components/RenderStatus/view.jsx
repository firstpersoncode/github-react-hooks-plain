/*
    src/components/RenderStatus/view

    RenderStatus component view
    set browser header status on component rendered

    @param {Object} props - RenderStatus props
    @param {JSXElement} props.children - Render JSX inside RenderStatus
    @param {number} props.status - status to be set on header

    Render any component with status header
*/

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
