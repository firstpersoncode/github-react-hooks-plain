/*
    src/components/Events/Card/view

    Event's Card isolated component view

    _togglePayload for toggle the visible of the event's payload
    render detail of event
*/

import React, { useState } from 'react'

import ProgressiveImage from '~/components/ProgressiveImage'

import useStyle from './style'

const EventCard = ({ user, event }) => {
    const classes = useStyle()
    const [payload, setPayload] = useState(false)

    const _togglePayload = () => {
        setPayload((prev) => !prev)
    }

    return (
        <div className={classes.card}>
            <div className={classes.item}>
                <ProgressiveImage
                    fallBack="/img/placeholder-square.jpg"
                    src={event.actor.avatar_url}
                    render={(src) => <img width="50" alt={user.name} src={src} />}
                />
                <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer">
                    {event.repo.name}
                </a>
                <small>{event.type}</small>
                <button style={{ padding: 10 }} onClick={_togglePayload}>
                    {payload ? '^' : 'v'}
                </button>
            </div>

            <div className={classes.payload + (payload ? ' open' : '')}>
                <pre>{JSON.stringify(event.payload, null, '\t')}</pre>
            </div>
            <p style={{ textAlign: 'right' }}>
                <small>{new Date(event.created_at).toLocaleString()}</small>
            </p>
        </div>
    )
}

export default EventCard
