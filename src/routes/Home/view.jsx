/*
    src/routes/Home/view

    Home route view

    _openProfile for trigger the request to GitHub server, return user info based on clicked history
    Render user info
*/

import React from 'react'
import { Helmet } from 'react-helmet-async'

import useStore from '~/store'
import { SET_USER_SELECTED, SET_USER_EVENTS_NEXT } from '~/store/user/constant'
import Profile from '~/containers/Profile'
import Events from '~/containers/Events'
import Repos from '~/containers/Repos'
import Followings from '~/containers/Followings'
import Followers from '~/containers/Followers'
import UserCard from '~/components/UserCard'

import useStyle from './style'

const Home = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { selectedFetch, history } = state.user

    const _openProfile = (userName) => async () => {
        window.scrollTo(0, 0)
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }

    return (
        <>
            <Helmet>
                <title>GitHub React Hooks</title>
                <meta name="title" content="GitHub React Hooks" />
                <meta
                    name="description"
                    content="GitHub page with user search and repository search, build using React"
                />
            </Helmet>

            {user ? (
                <div className={classes.container}>
                    <div className={classes.main}>
                        <div className={classes.history}>
                            Search history:{' '}
                            {history.length
                                ? history.map((h, i) => <UserCard key={i} user={h} onClick={_openProfile(h.login)} />)
                                : null}
                        </div>
                        <Profile />
                        <Events />
                    </div>

                    <div className={classes.side}>
                        <Followings />

                        <Followers />

                        <Repos />
                    </div>
                </div>
            ) : selectedFetch ? (
                <p>Loading ... </p>
            ) : null}
        </>
    )
}

export default Home
