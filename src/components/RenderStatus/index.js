/*
    src/components/RenderStatus

    RenderStatus component

    @param {Object} props - RenderStatus props
    @param {JSXElement} props.children - Render JSX inside RenderStatus
    @param {number} props.status - status to be set on header
*/

import Loadable from 'react-loadable'

const RenderStatus = Loadable({
    loader: () => import(/* WebpackChunkName: "render-status" */ './view'),
    loading: () => null
})

export default RenderStatus
