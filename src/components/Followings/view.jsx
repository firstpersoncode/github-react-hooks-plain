import React from 'react'

import useStore from '~/store'
import {
    SET_USER_FOLLOWERS_NEXT,
    SET_USER_FOLLOWERS_PREV,
    SET_USER_FOLLOWERS_PANEL,
    SET_USER_SELECTED,
    SET_USER_EVENTS_NEXT
} from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const Followings = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { followings, followingsPanel, followingsPage, followingsFetch } = state.user

    const _toggleFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_PANEL, payload: user.login })
    }

    const _nextFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_NEXT, payload: user.login })
    }

    const _prevFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_PREV, payload: user.login })
    }

    const _openProfile = (userName) => async () => {
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }

    return (
        <div onClick={_toggleFollowings} className={classes.root + (followingsFetch ? ' loading' : '')}>
            <span>Followings</span>
            <small>{user.followings}</small>
            <button onClick={_toggleFollowings}>{'expand'}</button>
            <div className={classes.body + (followingsPanel ? ' open' : '')}>
                {followings && followings.length ? (
                    <ul>
                        {followings
                            .filter((follower) => !follower.private)
                            .map((follower) => (
                                <li key={follower.id} onClick={_openProfile(follower.login)} className={classes.item}>
                                    <span>
                                        <ProgressiveImage
                                            fallBack={follower.avatar_url}
                                            src={follower.avatar_url}
                                            render={(src) => <img width="30" alt={follower.login} src={src} />}
                                        />
                                    </span>
                                    <span>{follower.login}</span>
                                </li>
                            ))}
                    </ul>
                ) : null}
                <div className={classes.pagination}>
                    <button onClick={_prevFollowings}>{'<--'}</button>
                    <small>Page {followingsPage}</small>
                    <button onClick={_nextFollowings}>{'-->'}</button>
                </div>
            </div>
        </div>
    )
}

export default Followings
