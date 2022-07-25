import React from 'react'
import {useAuth} from "../../auth/Auth";
import {Outlet, useNavigate} from "react-router-dom";
import CustomLink from "../CustomLink";

export const Profile = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    console.log('Profile auth.user:',auth.user)
    return (
        <div className='profile-page-container'>
            <p>Profile Page - {auth.user.email}</p>
            <div className='navbar'>
                <ul className='navbar-links'>
                    <li>
                        <CustomLink to="view">View Profile</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="edit">Edit Profile</CustomLink>
                    </li>
                    <li>
                        <a onClick={() => auth.signOut(auth.user, () => navigate("/"))}>Sign Out</a>
                    </li>
                </ul>
            </div>
            <Outlet /> {/*this enables nested routes*/}
        </div>
    )
}