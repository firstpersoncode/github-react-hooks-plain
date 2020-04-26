/*
    src/components/UserCard

    UserCard component

    @param {Object} props - UserCard props
    @param {Object} props.user - object of user
    @param {Funtion} props.onClick - Function to open the user info
*/

import Loadable from 'react-loadable-visibility/react-loadable'

const Followers = Loadable({
    loader: () => import(/* WebpackChunkName: "followers" */ './view'),
    loading: () => null
})

export default Followers
