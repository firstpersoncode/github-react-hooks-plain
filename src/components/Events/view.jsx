import React from 'react'

import useStore from '~/store'
import { SET_USER_EVENTS_NEXT, SET_USER_EVENTS_PREV } from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

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
            {events && events.length
                ? events
                      .filter((event) => event.public)
                      .map((event) => (
                          <div key={event.id}>
                              <ProgressiveImage
                                  fallBack={event.actor.avatar_url}
                                  src={event.actor.avatar_url}
                                  render={(src) => <img width="30" alt={user.name} src={src} />}
                              />
                              <a
                                  href={`https://github.com/${event.repo.name}`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  {event.repo.name}
                              </a>
                              <small>{new Date(event.created_at).toLocaleString()}</small>
                              <small>{event.type}</small>
                              <div className={classes.payload}>
                                  <pre>{JSON.stringify(event.payload, null, '\t')}</pre>
                              </div>
                          </div>
                      ))
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
