import Loadable from 'react-loadable-visibility/react-loadable'

const Followings = Loadable({
    loader: () => import(/* WebpackChunkName: "followings" */ './view'),
    loading: () => null
})

export default Followings
