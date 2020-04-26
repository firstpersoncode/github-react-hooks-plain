import React from 'react'
import { Helmet } from 'react-helmet-async'

import useStore from '~/store'
import Profile from '~/components/Profile'
import Events from '~/components/Events'
import Repos from '~/components/Repos'
import Followings from '~/components/Followings'
import Followers from '~/components/Followers'

import useStyle from './style'

const Home = () => {
    const classes = useStyle()
    const { state } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { selectedFetch } = state.user

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
