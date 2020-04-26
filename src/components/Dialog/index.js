import Loadable from 'react-loadable-visibility/react-loadable'

const Dialog = Loadable({
    loader: () => import(/* WebpackChunkName: "dialog" */ './view'),
    loading: () => null
})

export default Dialog
