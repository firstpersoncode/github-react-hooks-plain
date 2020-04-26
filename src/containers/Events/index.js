/*
    src/containers/Events

    Events container
*/

import Loadable from 'react-loadable-visibility/react-loadable'

const Events = Loadable({
    loader: () => import(/* WebpackChunkName: "events" */ './view'),
    loading: () => null
})

export default Events
