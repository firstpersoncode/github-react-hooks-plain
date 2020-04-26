import React, { useState } from 'react'

import useStore from '~/store'
import { SET_USER_EVENTS_NEXT, SET_USER_EVENTS_PREV } from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

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
                    fallBack={event.actor.avatar_url}
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

const Events = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { events, eventsPage, eventsFetch } = state.user

    const _nextEvents = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_EVENTS_NEXT, payload: user.login })
    }

    const _prevEvents = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_EVENTS_PREV, payload: user.login })
    }

    return (
        <div className={classes.root + (eventsFetch ? ' loading' : '')}>
            {events && events.length
                ? events
                      .filter((event) => event.public)
                      .map((event, i) => <EventCard key={i} user={user} event={event} />)
                : null}
            <div className={classes.pagination}>
                <button onClick={_prevEvents}>{'<--'}</button>
                <small>Page {eventsPage}</small>
                <button onClick={_nextEvents}>{'-->'}</button>
            </div>
        </div>
    )
}

export default Events
