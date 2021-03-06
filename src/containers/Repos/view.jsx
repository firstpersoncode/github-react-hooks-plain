/*
    src/containers/Repos/view

    Repos container view

    _toggleRepos for toggle the visible of the repos
    _nextRepos for trigger the request to GitHub server, return next list of repos
    _prevRepos for trigger the request to GitHub server, return previous list of repos
    _openProject for trigger the request to GitHub server, return project info based on clicked repo and redirect to project page

    Render list of repos
*/

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useStore from '~/store'
import { SET_USER_REPOS_NEXT, SET_USER_REPOS_PREV, SET_USER_REPOS_PANEL } from '~/store/user/constant'
import {
    SET_PROJECT_SELECTED,
    SET_PROJECT_CONTENTS,
    SET_PROJECT_LANGUAGES,
    SET_PROJECT_CONTRIBUTORS
} from '~/store/project/constant'
import ProgressiveImage from '~/components/ProgressiveImage'

import useStyle from './style'

const Repos = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { repos, reposPanel, reposPage, reposFetch } = state.user

    const _toggleRepos = (e) => {
        if (e) {
            e.stopPropagation()
        }

        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_PANEL, payload: user.login })
    }

    useEffect(() => {
        _toggleRepos()
    }, [user])

    const _nextRepos = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_NEXT, payload: user.login })
    }

    const _prevRepos = () => {
        if (!user) {
            return
        }

        actions({ type: SET_USER_REPOS_PREV, payload: user.login })
    }

    const history = useHistory()

    const _openProject = (projectName) => async () => {
        await history.push({ pathname: '/project', state: { preventLoadData: true } })
        await actions({ type: SET_PROJECT_SELECTED, payload: projectName })
        await actions({ type: SET_PROJECT_CONTRIBUTORS, payload: projectName })
        await actions({ type: SET_PROJECT_CONTENTS, payload: projectName })
        actions({ type: SET_PROJECT_LANGUAGES, payload: projectName })
    }

    return (
        <div className={classes.root + (reposFetch ? ' loading' : '') + (reposPanel ? ' open' : '')}>
            <div className={classes.header} onClick={_toggleRepos}>
                <span>
                    <small>{user.public_repos}</small> Repos
                </span>
                <button onClick={_toggleRepos}>{reposPanel ? '^' : 'v'}</button>
            </div>

            {reposPanel ? (
                <>
                    {repos && repos.length ? (
                        <ul className={classes.list}>
                            {repos
                                .filter((repo) => !repo.private)
                                .map((repo) => (
                                    <li key={repo.id} className={classes.itemList}>
                                        <button onClick={_openProject(repo.full_name)} className={classes.item}>
                                            <span>
                                                <ProgressiveImage
                                                    fallBack="/img/placeholder-square.jpg"
                                                    src={repo.owner.avatar_url}
                                                    render={(src) => (
                                                        <img width="30" alt={repo.owner.login} src={src} />
                                                    )}
                                                />
                                            </span>
                                            <p style={{ fontSize: 20 }}>{repo.name}</p>
                                        </button>
                                        {repo.language ? <small>{repo.language}</small> : null}
                                        {repo.description ? <p>{repo.description}</p> : null}
                                        <small>Last update: {new Date(repo.pushed_at).toLocaleString()}</small>
                                    </li>
                                ))}
                        </ul>
                    ) : null}
                    <div className={classes.pagination}>
                        <button onClick={_prevRepos}>{'<--'}</button>
                        <small>Page {reposPage}</small>
                        <button onClick={_nextRepos}>{'-->'}</button>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Repos
