/*
    src/components/Dialog

    Dialog component

    @param {Object} props - Dialog props
    @param {JSXElement} props.children - Render JSX inside Dialog
    @param {boolean} props.open - state for opening and closing the dialog
    @param {Function} props.onClose - close Dialog handler
*/

import Loadable from 'react-loadable-visibility/react-loadable'

const Dialog = Loadable({
    loader: () => import(/* WebpackChunkName: "dialog" */ './view'),
    loading: () => null
})

export default Dialog
