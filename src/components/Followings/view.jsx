import React from 'react'

import useStore from '~/store'
import {
    SET_USER_FOLLOWINGS_NEXT,
    SET_USER_FOLLOWINGS_PREV,
    SET_USER_FOLLOWINGS_PANEL,
    SET_USER_SELECTED,
    SET_USER_EVENTS_NEXT
} from '~/store/user/constant'

import ProgressiveImage from '../ProgressiveImage'

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
                                    <li key={following.id} className={classes.itemList}>
                                        <button onClick={_openProfile(following.login)} className={classes.item}>
                                            <span>
                                                <ProgressiveImage
                                                    fallBack="/img/placeholder-square.jpg"
                                                    src={following.avatar_url}
                                                    render={(src) => <img width="30" alt={following.login} src={src} />}
                                                />
                                            </span>
                                            <span>{following.login}</span>
                                        </button>
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
