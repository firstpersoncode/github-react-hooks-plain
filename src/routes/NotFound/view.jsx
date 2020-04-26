import React from 'react'
import { Helmet } from 'react-helmet-async'

import RenderStatus from '~/components/RenderStatus'

const NotFound = () => (
    <RenderStatus status={404}>
        <Helmet>
            <title>Oops</title>
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1>Not found ..</h1>
    </RenderStatus>
)
export default NotFound
