/*
    src/routes/Project/view

    Project route view
    inject raw markdown into dom using "marked"
    see: https://www.npmjs.com/package/marked

    _fetchMarkdown request to raw file of the README.md project, set then render the markdown state
    _openProfile for trigger the request to GitHub server, return user info based on clicked owner

    Render project info and its README.md file
*/

import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useHistory, Link } from 'react-router-dom'
import marked from 'marked'

import useStore, { SET_ERROR } from '~/store'
import ProgressiveImage from '~/components/ProgressiveImage'
import { SET_USER_SELECTED, SET_USER_EVENTS_NEXT } from '~/store/user/constant'

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
        await history.push({ pathname: '/', state: { preventLoadData: true } })
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
                    <h1>{project.name}</h1>
                    <button onClick={_openProfile(project.owner.login)} className={classes.profile}>
                        <ProgressiveImage
                            fallBack="/img/placeholder-square.jpg"
                            src={project.owner.avatar_url}
                            render={(src) => <img width="20" alt={project.owner.login} src={src} />}
                        />
                        @{project.owner.login}
                    </button>
                    <br />
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                        @{project.full_name}
                    </a>

                    <p>{project.description}</p>

                    <div className={classes.markdown}>
                        <small>Created: {new Date(project.created_at).toLocaleString()}</small> |{' '}
                        <small>Updated: {new Date(project.updated_at).toLocaleString()}</small> |{' '}
                        <small>Pushed: {new Date(project.pushed_at).toLocaleString()}</small>
                        <div className={classes.langs}>
                            Tech stack:
                            {Object.keys(languages).length ? (
                                Object.keys(languages).map((lang, i) => (
                                    <span key={i} className={classes.lang}>
                                        {lang}
                                    </span>
                                ))
                            ) : languagesFetch ? (
                                <p>Loading ..</p>
                            ) : null}
                        </div>
                        {contentsFetch ? (
                            <p>Loading content ...</p>
                        ) : markdown ? (
                            <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
                        ) : null}
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>Try search project using the search top bar</p>
            )}
        </>
    )
}

export default Project
