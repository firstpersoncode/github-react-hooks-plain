import React, { FunctionComponent, useState } from 'react'
import { useLocation } from 'react-router-dom'

import useStore from '~/store'
import { SET_USER_SELECTED, SET_USER_EVENTS_NEXT, SET_USER_QUERY, SET_USER_QUERY_PREV } from '~/store/user'
import {
    SET_PROJECT_SELECTED,
    SET_PROJECT_CONTENTS,
    SET_PROJECT_LANGUAGES,
    SET_PROJECT_QUERY,
    SET_PROJECT_QUERY_PREV
} from '~/store/project'
import { PATH_PROJECT } from '~/variables/urls'

import ProgressiveImage from '../ProgressiveImage'

import useStyle from './style'

const SearchProfile = () => {
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

    const _closeQuery = () => {
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
        _closeQuery()
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
        <form onSubmit={_submit}>
            <input
                value={search}
                placeholder={isProject ? 'GitHub Repository name' : 'GitHub User name'}
                onChange={_setSearch}
            />
            <button type="submit" onClick={_submit}>
                Search
            </button>

            {queryFetch ? <p>Searching ...</p> : null}

            <div className={classes.dialogContainer + (showQueryResult ? ' open' : '')}>
                <div className={classes.dialogContent + (queryFetch ? ' loading' : '')}>
                    <p>Search result for: {search}</p>
                    <div className={classes.result}>
                        {query.length
                            ? query.map((q, i) => (
                                  <div onClick={_openProfile(q.login || q.full_name)} key={i} className={classes.item}>
                                      <ProgressiveImage
                                          fallBack={q.avatar_url || q.owner.avatar_url}
                                          src={q.avatar_url || q.owner.avatar_url}
                                          render={(src) => <img alt={q.login || q.name} src={src} />}
                                      />
                                      <p>{q.login || q.name}</p>
                                  </div>
                              ))
                            : null}
                    </div>

                    <div className={classes.pagination}>
                        <button onClick={_prevQuery}>{'<--'}</button>
                        <small>Page {queryPage}</small>
                        <button onClick={_nextQuery}>{'-->'}</button>
                    </div>

                    <button onClick={_closeQuery} autoFocus>
                        Close
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchProfile
