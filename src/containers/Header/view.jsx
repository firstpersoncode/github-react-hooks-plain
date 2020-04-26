/*
    src/containers/Header/view

    Header container view

    check if header in project page or root page using useLocation hook
    _setSearch for input controller
    _submit for submitting and request to GitHub server, returning list of query (user, project)
    _closeQueryResult for closing the dialog search result
    _nextQuery for requesting to GitHub server, returning next list of query (user, project)
    _prevQuery for requesting to GitHub server, returning prev list of query (user, project)
    _openProfile for closing the dialog result and trigger the request to GitHub server, return user info based on clicked query

    Render search bar, page navigation and dialog of search result
*/

import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

import useStore from '~/store'
import { SET_USER_SELECTED, SET_USER_EVENTS_NEXT, SET_USER_QUERY, SET_USER_QUERY_PREV } from '~/store/user/constant'
import {
    SET_PROJECT_SELECTED,
    SET_PROJECT_CONTENTS,
    SET_PROJECT_LANGUAGES,
    SET_PROJECT_QUERY,
    SET_PROJECT_QUERY_PREV
} from '~/store/project/constant'
import { PATH_PROJECT } from '~/variables/urls'
import ProgressiveImage from '~/components/ProgressiveImage'
import Dialog from '~/components/Dialog'

import useStyle from './style'

const Header = () => {
    const classes = useStyle()
    const { state, actions } = useStore()
    const [search, setSearch] = useState('')
    const [showQueryResult, setShowQueryResult] = useState(false)

    const _setSearch = (e) => {
        const { value } = e.target
        setSearch(value)
    }
    const location = useLocation()
    const isProject = PATH_PROJECT === location.pathname || PATH_PROJECT === location.pathname + '/'
    const { query: userQuery, queryPage: userQueryPage, queryFetch: userQueryFetch } = state.user
    const { query: projectQuery, queryPage: projectQueryPage, queryFetch: projectQueryFetch } = state.project

    const _submit = async (e) => {
        e.preventDefault()

        if (isProject) {
            await actions({ type: SET_PROJECT_QUERY, payload: search })
            setShowQueryResult(true)
        } else {
            await actions({ type: SET_USER_QUERY, payload: search })
            setShowQueryResult(true)
        }
    }

    const _closeQueryResult = () => {
        setShowQueryResult(false)
    }

    const _nextQuery = () => {
        if (isProject) {
            actions({ type: SET_PROJECT_QUERY, payload: search })
        } else {
            actions({ type: SET_USER_QUERY, payload: search })
        }
    }

    const _prevQuery = () => {
        if (isProject) {
            actions({ type: SET_PROJECT_QUERY_PREV, payload: search })
        } else {
            actions({ type: SET_USER_QUERY_PREV, payload: search })
        }
    }

    const _openProfile = (selected) => async () => {
        window.scrollTo(0, 0)
        _closeQueryResult()
        if (isProject) {
            await actions({ type: SET_PROJECT_SELECTED, payload: selected })
            await actions({ type: SET_PROJECT_CONTENTS, payload: selected })
            actions({ type: SET_PROJECT_LANGUAGES, payload: selected })
        } else {
            await actions({ type: SET_USER_SELECTED, payload: selected })
            actions({ type: SET_USER_EVENTS_NEXT, payload: selected })
        }
    }

    const query = isProject ? projectQuery : userQuery
    const queryPage = isProject ? projectQueryPage : userQueryPage
    const queryFetch = isProject ? projectQueryFetch : userQueryFetch

    return (
        <>
            <header className={classes.root}>
                <div className={classes.nav}>
                    <Link to="/">Profile</Link>
                    <Link to="/project">Project</Link>
                </div>
                <form onSubmit={_submit} className={classes.form}>
                    <input
                        className={classes.input}
                        value={search}
                        placeholder={isProject ? 'GitHub Repository name' : 'GitHub User name'}
                        onChange={_setSearch}
                    />
                    <button type="submit" onClick={_submit} className={classes.input + ' button'}>
                        Search
                    </button>
                </form>

                {queryFetch ? <span>Searching ...</span> : null}
            </header>

            <Dialog onClose={_closeQueryResult} open={showQueryResult}>
                <p>Search result for: {search}</p>
                <div className={classes.result + (queryFetch ? ' loading' : '')}>
                    {query.length
                        ? query.map((q, i) => (
                              <div key={i} className={classes.item}>
                                  <button onClick={_openProfile(q.login || q.full_name)} className={classes.itemList}>
                                      <ProgressiveImage
                                          fallBack="/img/placeholder-square.jpg"
                                          src={q.avatar_url || q.owner.avatar_url}
                                          render={(src) => <img width="30" alt={q.login || q.name} src={src} />}
                                      />
                                      <p>{q.login || q.name}</p>
                                  </button>
                              </div>
                          ))
                        : null}
                </div>

                <div className={classes.pagination}>
                    <button onClick={_prevQuery}>{'<--'}</button>
                    <small>Page {queryPage}</small>
                    <button onClick={_nextQuery}>{'-->'}</button>
                </div>
            </Dialog>
        </>
    )
}

export default Header
