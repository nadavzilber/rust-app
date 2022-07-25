import React from 'react'
import {useAuth} from "../../auth/Auth";

export const ProfilePage = () => {
    const auth = useAuth()

    return (
        <div className='profile-page-container'>
            <p>Profile Page</p>
            <p>Hello {auth.user.email}</p>
        </div>
    )
}