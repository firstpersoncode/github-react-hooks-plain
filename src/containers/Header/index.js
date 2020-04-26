/*
    src/containers/Header

    Header container

    contain:
        - Dialog
        - ProgressiveImage
*/

import Loadable from 'react-loadable-visibility/react-loadable'

const Header = Loadable({
    loader: () => import(/* WebpackChunkName: "header" */ './view'),
    loading: () => null
})

export default Header
