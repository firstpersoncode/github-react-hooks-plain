import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useHistory, Link } from 'react-router-dom'
import marked from 'marked'

import useStore, { SET_ERROR } from '~/store'
import ProgressiveImage from '~/components/ProgressiveImage'
import { SET_USER_SELECTED, SET_USER_EVENTS_NEXT } from '~/store/user'
import { PATH_ROOT } from '~/variables/urls'

import useStyle from './style'

const Project = () => {
    const classes = useStyle()
    const { state, actions } = useStore()

    const project =
        state.project && state.project.selected && Object.keys(state.project.selected).length && state.project.selected
    const { selectedFetch, contents, contentsFetch, languages, languagesFetch } = state.project

    const [markdown, setMarkdown] = useState('')
    const _fetchMarkdown = async () => {
        setMarkdown('')
        const md = contents.find((content) => content.name.toLowerCase() === 'readme.md')
        if (md) {
            try {
                const rawmd = await fetch(md.download_url)
                if (!rawmd.ok) {
                    throw await rawmd.json()
                }

                const result = await rawmd.text()

                setMarkdown(marked(result))
            } catch (err) {
                actions({
                    type: SET_ERROR,
                    payload: {
                        message:
                            // eslint-disable-next-line
                            "Failed to load the README.md file. The project probably doesn't have the README.md file or try to check your connection.",
                        statusCode: err.statusCode || 500
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (!contents.length) {
            return
        }

        _fetchMarkdown()
    }, [contents])

    const history = useHistory()
    const _openProfile = (userName) => async () => {
        history.push('/')
        await actions({ type: SET_USER_SELECTED, payload: userName })
        actions({ type: SET_USER_EVENTS_NEXT, payload: userName })
    }
    return (
        <>
            <Helmet>
                <title>GitHub React Hooks | Project</title>
                <meta name="title" content="GitHub React Hooks | Project" />
                <meta
                    name="description"
                    content="GitHub page with user search and repository search, build using React"
                />
            </Helmet>

            {project ? (
                <div className={classes.root + (selectedFetch ? ' loading' : '')}>
                    <h3>{project.name}</h3>
                    <button onClick={_openProfile(project.owner.login)}>
                        <ProgressiveImage
                            fallBack={project.owner.avatar_url}
                            src={project.owner.avatar_url}
                            render={(src) => <img width="30" alt={project.owner.login} src={src} />}
                        />
                        @{project.owner.login}
                    </button>

                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                        @{project.full_name}
                    </a>

                    <p>{project.description}</p>

                    <div className={classes.langs}>
                        {Object.keys(languages).length ? (
                            Object.keys(languages).map((lang, i) => <small key={i}>{lang}</small>)
                        ) : languagesFetch ? (
                            <p>Loading ..</p>
                        ) : null}
                    </div>

                    <div className={classes.right}>
                        <small>Created: {new Date(project.created_at).toLocaleString()}</small> |{' '}
                        <small>Updated: {new Date(project.updated_at).toLocaleString()}</small> |{' '}
                        <small>Pushed: {new Date(project.pushed_at).toLocaleString()}</small>
                    </div>

                    <div>
                        {contentsFetch ? (
                            <p>Loading content ...</p>
                        ) : markdown ? (
                            <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
                        ) : (
                            'No README.md file was found in this project'
                        )}
                    </div>
                </div>
            ) : (
                <p>
                    Try search project using the search top bar, or
                    <Link to={PATH_ROOT}>
                        <button>Go back to profile search</button>
                    </Link>
                </p>
            )}
        </>
    )
}

export default Project
