import React from 'react'

import useStyle from './style'

const Footer = () => {
    const classes = useStyle()
    return (
        <footer className={classes.root}>
            <p>
                &copy; Copyright 2020{' '}
                <a
                    style={{ color: 'white' }}
                    href="https://github.com/firstpersoncode"
                    target="_blank"
                    rel="noopener noreferrer">
                    @firstpersoncode
                </a>
            </p>
        </footer>
    )
}

export default Footer
