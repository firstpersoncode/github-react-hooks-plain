/*
    __core__/render

    Render the react component, and return the express router

    @param {Object} configs - contain the render function passed from src/__app__/server, and the array of react-router configs
    @param {Function({ req, res })} configs.render - function that will return the string of React component
    @param {Array} configs.routes - array of react-router config

    matchRoutes from react-router-config will be used for setting the response status to the client
    see: https://www.npmjs.com/package/react-router-config
    // path "**" is "404" page (defined in our react router)
    // we let react router to handle the 404 view
    // also set the static ctx header
    // but we still need to return the real status from server side
*/

import { matchRoutes } from 'react-router-config'

export default (configs) => async (req, res) => {
    const { render, routes } = configs

    try {
        const expressCtx = { req, res }

        const {
            html,
            routeCtx: { status, url }
        } = await render(expressCtx)

        if (url) {
            return res.status(302).redirect(url)
        }

        matchRoutes(routes, req.path).map(({ match }) => {
            if (match && match.path !== '**') {
                res.status(200)
            } else {
                res.status(404)
            }
        })

        if (status) {
            /* eslint-disable-next-line no-console */
            console.log('Static Route context status: ', status)
            return res.status(status).send(html)
        }

        res.send(html)
    } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error('Error render:\n', err)
        throw res.status(500).send(err)
    }
}
