import {
    ENDPOINT_GITHUB_PROJECT_NAME,
    ENDPOINT_GITHUB_PROJECT_CONTENT,
    ENDPOINT_GITHUB_PROJECT_LANGUAGE,
    ENDPOINT_GITHUB_PROJECT_QUERY
} from '~/variables/urls'

// ACTION TYPES
export const SET_PROJECT_QUERY = 'SET/PROJECT/QUERY'
export const SET_PROJECT_QUERY_PREV = 'SET/PROJECT/QUERY/PREV'

export const SET_PROJECT_SELECTED = 'SET/PROJECT/SELECTED'
export const SET_PROJECT_CONTENTS = 'SET/PROJECT/CONTENTS'
export const SET_PROJECT_LANGUAGES = 'SET/PROJECT/LANGUAGES'

export const projectState = {
    query: [],
    queryFetch: false,
    queryPage: 0,

    selected: {},
    selectedFetch: false,

    contents: [],
    contentsFetch: false,

    languages: [],
    languagesFetch: false
}

export const setProjectQuery = async (setState, setError, q, next) => {
    let currPage = 1

    setState((prev) => {
        currPage = next ? prev.queryPage + 1 : prev.queryPage > 1 ? prev.queryPage - 1 : 1

        return {
            ...prev,
            queryPage: currPage,
            queryFetch: true
        }
    })

    try {
        const pquery = await fetch(ENDPOINT_GITHUB_PROJECT_QUERY(q, currPage))

        if (!pquery.ok) {
            throw await pquery.json()
        }

        const query = await pquery.json()

        setState((prev) => ({ ...prev, query: query.items, queryFetch: false }))
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
