import React, { FunctionComponent } from 'react'

import useStore from '~/store'
import { SET_USER_REPOS_PANEL, SET_USER_FOLLOWINGS_PANEL, SET_USER_FOLLOWERS_PANEL } from '~/store/user'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const Profile = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { selectedFetch } = state.user
    const _toggleRepos = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_PANEL, payload: user.login })
    }

    const _toggleFollowings = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWINGS_PANEL, payload: user.login })
    }

    const _toggleFollowers = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_FOLLOWERS_PANEL, payload: user.login })
    }

    return (
        <div className={classes.root + (selectedFetch ? ' loading' : '')}>
            <h3>{user.name}</h3>

            <ProgressiveImage
                fallBack={user.avatar_url}
                src={user.avatar_url}
                render={(src) => <img alt={user.name} src={src} className={classes.large} />}
            />

            <button onClick={_toggleRepos}>{user.public_repos} Repos</button>
            <button onClick={_toggleFollowings}>{user.following} Following</button>
            <button onClick={_toggleFollowers}>{user.followers} Followers</button>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                @{user.login}
            </a>

            {user.blog ? (
                <a href={user.blog} target="_blank" rel="noopener noreferrer">
                    Blog / WebSite
                </a>
            ) : null}

            {user.location ? <p>Location: {user.location}</p> : null}
            {user.company ? <p>Company: {user.company}</p> : null}
            {user.bio ? <p>{user.bio}</p> : null}
        </div>
    )
}

export default Profile
