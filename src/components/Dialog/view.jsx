/*
    src/components/Dialog/view

    Dialog component view

    @param {Object} props - Dialog props
    @param {JSXElement} props.children - Render JSX inside Dialog
    @param {boolean} props.open - state for opening and closing the dialog
    @param {Function} props.onClose - close Dialog handler

    Render dialog
*/

import React from 'react'

import useStyle from './style'

const Dialog = ({ children, open, onClose }) => {
    const classes = useStyle()

    return (
        <div className={classes.dialogContainer + (open ? ' open' : '')}>
            <div className={classes.dialogContent}>
                <div className={classes.close}>
                    <button style={{ padding: 10 }} onClick={onClose} autoFocus>
                        Close
                    </button>
                </div>
                <div className={classes.dialogChild}>{children}</div>
                <div className={classes.close}>
                    <button style={{ padding: 5 }} onClick={onClose} autoFocus>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialog
