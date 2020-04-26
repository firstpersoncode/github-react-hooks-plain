import React from 'react'
import { Link } from 'react-router-dom'

import SearchProfile from '~/components/SearchProfile'

import useStyle from './style'

const Header = () => {
    const classes = useStyle()
    return (
        <header className={classes.root}>
            <div className={classes.nav}>
                <Link to="/">Profile</Link>
                <Link to="/project">Project</Link>
            </div>
            <SearchProfile />
        </header>
    )
}

export default Header
