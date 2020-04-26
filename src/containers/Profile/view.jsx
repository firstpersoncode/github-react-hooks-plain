/*
    src/containers/Profile/view

    Profile container view

    _toggleRepos for toggle repository panel on sidebar
    _toggleFollowings for toggle followings panel on sidebar
    _toggleFollowers for toggle followers panel on sidebar

    Render user info and avatar, display following, followers and repos count
*/

import React from 'react'

import useStore from '~/store'
import { SET_USER_REPOS_PANEL, SET_USER_FOLLOWINGS_PANEL, SET_USER_FOLLOWERS_PANEL } from '~/store/user/constant'
import ProgressiveImage from '~/components/ProgressiveImage'

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
            <div>
                <ProgressiveImage
                    fallBack="/img/placeholder-square.jpg"
                    src={user.avatar_url}
                    render={(src) => <img alt={user.name} src={src} className={classes.large} />}
                />
            </div>
            <div className={classes.info}>
                <h1>{user.name}</h1>
                <p>
                    GitHub:{' '}
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                        @{user.login}
                    </a>
                </p>
                {user.blog ? (
                    <p>
                        Blog / Website:{' '}
                        <a href={user.blog} target="_blank" rel="noopener noreferrer">
                            {user.blog}
                        </a>
                    </p>
                ) : null}
                {user.location ? <p>Location: {user.location}</p> : null}
                {user.company ? <p>Company: {user.company}</p> : null}
                {user.bio ? <p>{user.bio}</p> : null}

                <button style={{ padding: 15 }} onClick={_toggleRepos}>
                    {user.public_repos} Repos
                </button>
                <button style={{ padding: 15 }} onClick={_toggleFollowings}>
                    {user.following} Following
                </button>
                <button style={{ padding: 15 }} onClick={_toggleFollowers}>
                    {user.followers} Followers
                </button>
            </div>
        </div>
    )
}

export default Profile
