import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/Auth";
import AuthStatus from "../Auth/AuthStatus";
import '../../style.css'
import React from "react";
import CustomLink from "../CustomLink";

export const Layout = () => {
    const auth = useAuth();
    const navigate = useNavigate()
    const userExists = !!auth?.user

    return (
        <div className='main-container'>
            <nav className='main-navbar navbar'>
                <AuthStatus isConnected={userExists}/>
                <ul className='navbar-links'>
                    <li>
                        {/*<Link to="/">Home Page</Link>*/}
                        <CustomLink to="/">Home Page</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="login">Login Page</CustomLink>
                    </li>
                    <li>
                        {/*<Link to="emails">Emails</Link>*/}
                        <CustomLink to="emails">Emails</CustomLink>
                    </li>
                    {userExists && <li>
                        <a onClick={() => auth.signOut(() => navigate("/"))}>Sign Out</a>
                    </li>}
                </ul>
            </nav>
            <Outlet /> {/*this enables nested routes*/}
        </div>
    )
}