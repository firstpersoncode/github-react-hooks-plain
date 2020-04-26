import Loadable from 'react-loadable'

const RenderStatus = Loadable({
    loader: () => import(/* WebpackChunkName: "render-status" */ './view'),
    loading: () => null
})

export default RenderStatus
