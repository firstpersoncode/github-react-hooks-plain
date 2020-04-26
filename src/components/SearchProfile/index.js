import Loadable from 'react-loadable-visibility/react-loadable'

const SearchProfile = Loadable({
    loader: () => import(/* WebpackChunkName: "search-profile" */ './view'),
    loading: () => null
})

export default SearchProfile
