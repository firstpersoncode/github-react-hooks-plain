/*
    src/components/ProgressiveImage

    ProgressiveImage component

    @param {Object} props - ProgressiveImage props
    @param {Function(src: string)} props.render - Function that return the placeholder / the real source of img
    @param {string} props.fallBack - the img source that will be rendered before the real source is rendered
*/

import Loadable from 'react-loadable-visibility/react-loadable'

const ProgressiveImage = Loadable({
    loader: () => import(/* WebpackChunkName: "progressive-image" */ './view'),
    loading: () => null
})

export default ProgressiveImage
