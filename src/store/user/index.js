/*
    src/store/user

    Effects, actions and dispatcher for managing the user state
    creating request to GitHub server
*/

import {
    ENDPOINT_GITHUB_USER_NAME,
    ENDPOINT_GITHUB_USER_EVENT,
    ENDPOINT_GITHUB_USER_REPO,
    ENDPOINT_GITHUB_USER_FOLLOWING,
    ENDPOINT_GITHUB_USER_FOLLOWER,
    ENDPOINT_GITHUB_USER_QUERY
} from '~/variables/urls'

import { userState } from './state'

export const setUserQuery = async (setState, setError, q, next) => {
    let currPage = 0

    await setState((prev) => {
        currPage = next ? prev.queryPage + 1 : prev.queryPage > 1 ? prev.queryPage - 1 : 1

        return {
            ...prev,
            queryFetch: true
        }
    })

    try {
        const pquery = await fetch(ENDPOINT_GITHUB_USER_QUERY(q, currPage))

        if (!pquery.ok) {
            throw await pquery.json()
        }

        const query = await pquery.json()

        setState((prev) => ({ ...prev, query: query.items, queryPage: currPage, queryFetch: false }))
    } catch (err) {
        setState((prev) => ({ ...prev, queryFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserSelected = async (setState, setError, userName) => {
    setState((prev) => ({ ...prev, selectedFetch: true }))

    try {
        const pselected = await fetch(ENDPOINT_GITHUB_USER_NAME(userName))

        if (!pselected.ok) {
            throw await pselected.json()
        }

        const selected = await pselected.json()

        setState((prev) => ({ ...prev, ...userState, selected, selectedFetch: false }))
    } catch (err) {
        setState((prev) => ({ ...prev, selectedFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserEvents = async (setState, setError, userName, next) => {
    let currPage = 0

    await setState((prev) => {
        currPage = next ? prev.eventsPage + 1 : prev.eventsPage > 1 ? prev.eventsPage - 1 : 1

        return {
            ...prev,
            eventsFetch: true
        }
    })

    try {
        const pevents = await fetch(ENDPOINT_GITHUB_USER_EVENT(userName, currPage))

        if (!pevents.ok) {
            throw await pevents.json()
        }

        const events = await pevents.json()

        setState((prev) => ({
            ...prev,
            events,
            eventsPage: currPage,
            eventsFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, eventsFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserRepos = async (setState, setError, userName, next) => {
    let currPage = 0

    await setState((prev) => {
        currPage = next ? prev.reposPage + 1 : prev.reposPage > 1 ? prev.reposPage - 1 : 1

        return {
            ...prev,
            reposFetch: true
        }
    })

    try {
        const prepos = await fetch(ENDPOINT_GITHUB_USER_REPO(userName, currPage))

        if (!prepos.ok) {
            throw await prepos.json()
        }

        const repos = await prepos.json()

        setState((prev) => ({
            ...prev,
            repos,
            reposPage: currPage,
            reposFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, reposFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserReposPanel = async (setState, setError, userName) => {
    setState((prev) => {
        if (!prev.reposPage) {
            setUserRepos(setState, setError, userName, true)
        }

        return {
            ...prev,
            reposPanel: !prev.reposPanel
        }
    })
}

export const setUserFollowings = async (setState, setError, userName, next) => {
    let currPage = 1

    await setState((prev) => {
        currPage = next ? prev.followingsPage + 1 : prev.followingsPage > 1 ? prev.followingsPage - 1 : 1

        return {
            ...prev,
            followingsFetch: true
        }
    })

    try {
        const pfollowings = await fetch(ENDPOINT_GITHUB_USER_FOLLOWING(userName, currPage))

        if (!pfollowings.ok) {
            throw await pfollowings.json()
        }

        const followings = await pfollowings.json()

        setState((prev) => ({
            ...prev,
            followings,
            followingsPage: currPage,
            followingsFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, followingsFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserFollowingsPanel = async (setState, setError, userName) => {
    setState((prev) => {
        if (!prev.followingsPage) {
            setUserFollowings(setState, setError, userName, true)
        }

        return {
            ...prev,
            followingsPanel: !prev.followingsPanel
        }
    })
}

export const setUserFollowers = async (setState, setError, userName, next) => {
    let currPage = 0

    await setState((prev) => {
        currPage = next ? prev.followersPage + 1 : prev.followersPage > 1 ? prev.followersPage - 1 : 1

        return {
            ...prev,
            followersFetch: true
        }
    })

    try {
        const pfollowers = await fetch(ENDPOINT_GITHUB_USER_FOLLOWER(userName, currPage))

        if (!pfollowers.ok) {
            throw await pfollowers.json()
        }

        const followers = await pfollowers.json()

        setState((prev) => ({
            ...prev,
            followers,
            followersPage: currPage,
            followersFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, followersFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserFollowersPanel = async (setState, setError, userName) => {
    setState((prev) => {
        if (!prev.followersPage) {
            setUserFollowers(setState, setError, userName, true)
        }

        return {
            ...prev,
            followersPanel: !prev.followersPanel
        }
    })
}
