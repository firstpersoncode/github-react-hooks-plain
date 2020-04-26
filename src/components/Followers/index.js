import Loadable from 'react-loadable-visibility/react-loadable'

const Followers = Loadable({
    loader: () => import(/* WebpackChunkName: "followers" */ './view'),
    loading: () => null
})

export default Followers
