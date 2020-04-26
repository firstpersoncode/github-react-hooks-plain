/*
    src/containers/Events/view

    Events container view

    _toggleEvents for toggle the visible of the events
    _nextEvents for trigger the request to GitHub server, return next list of events
    _prevEvents for trigger the request to GitHub server, return previous list of events
    _openProfile for trigger the request to GitHub server, return user info based on clicked event

    Render list of events
*/

import React from 'react'

import useStore from '~/store'
import { SET_USER_EVENTS_NEXT, SET_USER_EVENTS_PREV } from '~/store/user/constant'

import EventCard from './EventCard'
import useStyle from './style'

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
            <div id="events">
                {events && events.length
                    ? events
                          .filter((event) => event.public)
                          .map((event, i) => <EventCard key={i} user={user} event={event} />)
                    : null}
            </div>
            <div className={classes.pagination}>
                <button id="events-prev" onClick={_prevEvents}>
                    {'<--'}
                </button>
                <small>Page {eventsPage}</small>
                <button id="events-next" onClick={_nextEvents}>
                    {'-->'}
                </button>
            </div>
        </div>
    )
}

export default Events
