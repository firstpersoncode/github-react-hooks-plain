/*
    src/components/ProgressiveImage/view

    ProgressiveImage component view
    lazy load img using this component, with placeholder before the real img is rendered.

    @param {Object} props - ProgressiveImage props
    @param {Function(src: string)} props.render - Function that return the placeholder / the real source of img
    @param {string} props.fallBack - the img source that will be rendered before the real source is rendered

    Render img
*/

import React, { useState, useEffect } from 'react'

const ProgressiveImage = ({ src, render, fallBack }) => {
    const initialState = {
        srcURI: undefined,
        loaded: false
    }

    const [state, setState] = useState(initialState)

    const setSRC = (srcURI) => {
        setState((prev) => ({ ...prev, srcURI }))
    }

    const setLoaded = () => {
        setState((prev) => ({ ...prev, loaded: true }))
    }

    const resolveImage = (resolve, srcURI) => () => resolve && srcURI && resolve(srcURI)

    const fetchImage = async (srcURI) =>
        new Promise((resolve) => {
            const image = new Image()
            image.src = srcURI
            image.addEventListener('load', resolveImage(resolve, srcURI), false)
        })

    useEffect(() => {
        fetchImage(src).then((srcURI) => {
            setSRC(srcURI)
            setTimeout(() => setLoaded(), 500)
        })

        const image = new Image()
        return () => image.removeEventListener('load', resolveImage())
    }, [src, fallBack])

    return <div className={state.loaded ? 'loaded' : undefined}>{render(state.srcURI ? state.srcURI : fallBack)}</div>
}

export default ProgressiveImage
