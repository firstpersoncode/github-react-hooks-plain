import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useStore from '~/store'
import { SET_USER_REPOS_NEXT, SET_USER_REPOS_PREV, SET_USER_REPOS_PANEL } from '~/store/user'
import { SET_PROJECT_SELECTED, SET_PROJECT_CONTENTS, SET_PROJECT_LANGUAGES } from '~/store/project'
import ProgressiveImage from '~/components/ProgressiveImage'

import useStyle from './style'

const Repos = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const user = state.user && state.user.selected && Object.keys(state.user.selected).length && state.user.selected
    const { repos, reposPanel, reposPage, reposFetch } = state.user

    const _toggleRepos = () => {
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
        history.push('/project')
        await actions({ type: SET_PROJECT_SELECTED, payload: projectName })
        await actions({ type: SET_PROJECT_CONTENTS, payload: projectName })
        actions({ type: SET_PROJECT_LANGUAGES, payload: projectName })
    }

    return (
        <div onClick={_toggleRepos} className={classes.root + (reposFetch ? ' loading' : '')}>
            <span>Repos</span>
            <small>{user.public_repos}</small>
            <button onClick={_toggleRepos}>{'expand'}</button>
            <div className={classes.body + (reposPanel ? ' open' : '')}>
                {repos && repos.length ? (
                    <ul>
                        {repos
                            .filter((repo) => !repo.private)
                            .map((repo) => (
                                <li key={repo.id} onClick={_openProject(repo.full_name)} className={classes.item}>
                                    <span>
                                        <ProgressiveImage
                                            fallBack={repo.avatar_url}
                                            src={repo.avatar_url}
                                            render={(src) => <img alt={repo.login} src={src} />}
                                        />
                                    </span>
                                    <p>{repo.name}</p>
                                    {repo.description ? <small>{repo.description}</small> : null}
                                    {repo.language ? <small>{repo.language}</small> : null}
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
            </div>
        </div>
    )
}

export default Repos
