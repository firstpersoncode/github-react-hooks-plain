import Loadable from 'react-loadable-visibility/react-loadable'

const Repos = Loadable({
    loader: () => import(/* WebpackChunkName: "repos" */ './view'),
    loading: () => null
})

export default Repos
