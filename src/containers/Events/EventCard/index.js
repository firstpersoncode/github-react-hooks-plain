/*
    src/components/Events/Card

    Event's Card isolated component
*/

import Loadable from 'react-loadable-visibility/react-loadable'

const EventCard = Loadable({
    loader: () => import(/* WebpackChunkName: "event-card" */ './view'),
    loading: () => null
})

export default EventCard
