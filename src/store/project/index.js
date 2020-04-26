/*
    src/store/project

    Effects, actions and dispatcher for managing the project state
    creating request to GitHub server
*/

import {
    ENDPOINT_GITHUB_PROJECT_NAME,
    ENDPOINT_GITHUB_PROJECT_CONTENT,
    ENDPOINT_GITHUB_PROJECT_LANGUAGE,
    ENDPOINT_GITHUB_PROJECT_QUERY
} from '~/variables/urls'

import { projectState } from './state'

export const setProjectQuery = async (setState, setError, q, next) => {
    let currPage = 0

    await setState((prev) => {
        currPage = next ? prev.queryPage + 1 : prev.queryPage > 1 ? prev.queryPage - 1 : 1

        return {
            ...prev,

            queryFetch: true
        }
    })

    try {
        const pquery = await fetch(ENDPOINT_GITHUB_PROJECT_QUERY(q, currPage))

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

export const setProjectSelected = async (setState, setError, projectName) => {
    setState((prev) => ({ ...prev, selectedFetch: true }))

    try {
        const pselected = await fetch(ENDPOINT_GITHUB_PROJECT_NAME(projectName))

        if (!pselected.ok) {
            throw await pselected.json()
        }

        const selected = await pselected.json()

        setState((prev) => ({ ...prev, ...projectState, selected, selectedFetch: false }))
    } catch (err) {
        setState((prev) => ({ ...prev, selectedFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setProjectContents = async (setState, setError, projectName) => {
    setState((prev) => ({
        ...prev,
        contentsFetch: true
    }))

    try {
        const pcontents = await fetch(ENDPOINT_GITHUB_PROJECT_CONTENT(projectName))

        if (!pcontents.ok) {
            throw await pcontents.json()
        }

        const contents = await pcontents.json()

        setState((prev) => ({
            ...prev,
            contents,
            contentsFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, contentsFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setProjectLanguages = async (setState, setError, projectName) => {
    setState((prev) => ({
        ...prev,
        languagesFetch: true
    }))

    try {
        const planguages = await fetch(ENDPOINT_GITHUB_PROJECT_LANGUAGE(projectName))

        if (!planguages.ok) {
            throw await planguages.json()
        }

        const languages = await planguages.json()

        setState((prev) => ({
            ...prev,
            languages,
            languagesFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, languagesFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}
