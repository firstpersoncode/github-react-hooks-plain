import Loadable from 'react-loadable'
import { PATH_ROOT } from '~/variables/urls'

import { SET_USER_EVENTS_NEXT, SET_USER_SELECTED } from '~/store/user'

const HomePromise = Loadable({
    loader: () => import(/* WebpackChunkName: "home" */ './view'),
    loading: () => null
})

const Home = {
    component: HomePromise,
    exact: true,
    path: PATH_ROOT,
    loadData: async ({ state, actions }) => {
        if (!(state.user && state.user.selected && Object.keys(state.user.selected).length)) {
            await actions({ type: SET_USER_SELECTED, payload: 'firstpersoncode' })
            actions({ type: SET_USER_EVENTS_NEXT, payload: 'firstpersoncode' })
        }
    }
}

export default Home
