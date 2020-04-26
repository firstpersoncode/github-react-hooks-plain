import Loadable from 'react-loadable-visibility/react-loadable'

const ProgressiveImage = Loadable({
    loader: () => import(/* WebpackChunkName: "progressive-image" */ './view'),
    loading: () => null
})

export default ProgressiveImage
