/*
    src/components/UserCard/view

    UserCard component view

    @param {Object} props - UserCard props
    @param {Object} props.user - object of user
    @param {Funtion} props.onClick - Function to open the user info

    Render avatar and name
*/

import React from 'react'

import ProgressiveImage from '~/components/ProgressiveImage'

import useStyle from './style'

const UserCard = ({ user, onClick }) => {
    const classes = useStyle()

    return (
        <div className={classes.user}>
            <button onClick={onClick} className={classes.info}>
                <ProgressiveImage
                    fallBack="/img/placeholder-square.jpg"
                    src={user.avatar_url}
                    render={(src) => <img width="30" alt={user.login} src={src} />}
                />
                <span>{user.login}</span>
            </button>
        </div>
    )
}

export default UserCard
