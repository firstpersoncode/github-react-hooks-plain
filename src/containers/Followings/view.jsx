/*
    src/containers/Followings/view

    Followings container view

    _toggleFollowings for toggle the visible of the followings
    _nextFollowings for trigger the request to GitHub server, return next list of followings
    _prevFollowings for trigger the request to GitHub server, return previous list of followings
    _openProfile for trigger the request to GitHub server, return user info based on clicked following

    Render list of followings
*/

import React from 'react'

import useStore from '~/store'
import {
    SET_USER_FOLLOWINGS_NEXT,
    SET_USER_FOLLOWINGS_PREV,
    SET_USER_FOLLOWINGS_PANEL,
    SET_USER_SELECTED,
    SET_USER_EVENTS_NEXT
} from '~/store/user/constant'
import UserCard from '~/components/UserCard'

import useStyle from './style'

const Followings = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { followings, followingsPanel, followingsPage, followingsFetch } = state.user

    const _toggleFollowings = (e) => {
        if (e) {
            e.stopPropagation()
        }

        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_PANEL, payload: user.login })
    }

    const _nextFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_NEXT, payload: user.login })
    }

    const _prevFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_PREV, payload: user.login })
    }

    const _openProfile = (userName) => async () => {
        window.scrollTo(0, 0)
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }

    return (
        <div className={classes.root + (followingsFetch ? ' loading' : '')}>
            <div className={classes.header} onClick={_toggleFollowings}>
                <span>
                    <small>{user.following}</small> Followings
                </span>
                <button onClick={_toggleFollowings}>{followingsPanel ? '^' : 'v'}</button>
            </div>
            {followingsPanel ? (
                <>
                    {followings && followings.length ? (
                        <ul className={classes.list}>
                            {followings
                                .filter((following) => !following.private)
                                .map((following) => (
                                    <li key={following.id}>
                                        <UserCard user={following} onClick={_openProfile(following.login)} />
                                    </li>
                                ))}
                        </ul>
                    ) : null}
                    <div className={classes.pagination}>
                        <button onClick={_prevFollowings}>{'<--'}</button>
                        <small>Page {followingsPage}</small>
                        <button onClick={_nextFollowings}>{'-->'}</button>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Followings
