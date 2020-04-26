/*
    src/containers/Profile

    Profile container

    contain:
        - ProgressiveImage
*/

import Loadable from 'react-loadable-visibility/react-loadable'

const Profile = Loadable({
    loader: () => import(/* WebpackChunkName: "profile" */ './view'),
    loading: () => null
})

export default Profile
