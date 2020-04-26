/*
    src/containers/Followers/view

    Followers container view

    _toggleFollowers for toggle the visible of the followers
    _nextFollowers for trigger the request to GitHub server, return next list of followers
    _prevFollowers for trigger the request to GitHub server, return previous list of followers
    _openProfile for trigger the request to GitHub server, return user info based on clicked follower

    Render list of followers
*/

import React from 'react'

import useStore from '~/store'
import {
    SET_USER_FOLLOWERS_NEXT,
    SET_USER_FOLLOWERS_PREV,
    SET_USER_FOLLOWERS_PANEL,
    SET_USER_SELECTED,
    SET_USER_EVENTS_NEXT
} from '~/store/user/constant'
import UserCard from '~/components/UserCard'

import useStyle from './style'

const Followers = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { followers, followersPanel, followersPage, followersFetch } = state.user

    const _toggleFollowers = (e) => {
        if (e) {
            e.stopPropagation()
        }

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
        window.scrollTo(0, 0)
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }

    return (
        <div className={classes.root + (followersFetch ? ' loading' : '')}>
            <div className={classes.header} onClick={_toggleFollowers}>
                <span>
                    <small>{user.followers}</small> Followers
                </span>
                <button onClick={_toggleFollowers}>{followersPanel ? '^' : 'v'}</button>
            </div>
            {followersPanel ? (
                <>
                    {followers && followers.length ? (
                        <ul className={classes.list}>
                            {followers
                                .filter((follower) => !follower.private)
                                .map((follower) => (
                                    <li key={follower.id}>
                                        <UserCard user={follower} onClick={_openProfile(follower.login)} />
                                    </li>
                                ))}
                        </ul>
                    ) : null}

                    <div className={classes.pagination}>
                        <button onClick={_prevFollowers}>{'<--'}</button>
                        <small>Page {followersPage}</small>
                        <button onClick={_nextFollowers}>{'-->'}</button>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Followers
