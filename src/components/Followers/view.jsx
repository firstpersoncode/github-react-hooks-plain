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

const Followers = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { followers, followersPanel, followersPage, followersFetch } = state.user

    const _toggleFollowers = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_PANEL, payload: user.login })
    }

    const _nextFollowers = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_NEXT, payload: user.login })
    }

    const _prevFollowers = () => {
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
        <div onClick={_toggleFollowers} className={classes.root + (followersFetch ? ' loading' : '')}>
            <span>Followers</span>
            <small>{user.followers}</small>
            <button onClick={_toggleFollowers}>{'expand'}</button>
            <div className={classes.body + (followersPanel ? ' open' : '')}>
                {followers && followers.length ? (
                    <ul>
                        {followers
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
                    <button onClick={_prevFollowers}>{'<--'}</button>
                    <small>Page {followersPage}</small>
                    <button onClick={_nextFollowers}>{'-->'}</button>
                </div>
            </div>
        </div>
    )
}

export default Followers
