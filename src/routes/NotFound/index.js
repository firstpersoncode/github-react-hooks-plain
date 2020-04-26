import Loadable from 'react-loadable'

const NotFoundPromise = Loadable({
    loader: () => import(/* WebpackChunkName: "not-found" */ './view'),
    loading: () => null
})

const NotFound = {
    component: NotFoundPromise,
    path: '**'
}

export default NotFound
