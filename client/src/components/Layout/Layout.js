import React, {useState} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/Auth";
import LoginStatus from "../Auth/LoginStatus";
import CustomLink from "../CustomLink";
import {Modal} from "../Modal";
import '../../style.css'

export const Layout = () => {
    const auth = useAuth();
    const navigate = useNavigate()
    const userExists = !!auth?.user
    const [showModal, setShowModal] = useState(false)

    return (
        <div className='main-container'>
            <nav className='main-navbar navbar'>
                <LoginStatus isConnected={userExists}/>
                <ul className='navbar-links'>
                    <li>
                        <CustomLink to="/">Home Page</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="login">Login Page</CustomLink>
                    </li>
                    {/*<li>*/}
                    {/*    <CustomLink to="dashboard">Dashboard</CustomLink>*/}
                    {/*</li>*/}
                    <li>
                        <CustomLink to="dashboard/sent-emails" isProtected={!userExists}>Sent Emails</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="dashboard/compose-email" isProtected={!userExists}>Compose Email</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="dashboard/profile" isProtected={!userExists}>Profile</CustomLink>
                    </li>
                    <li>
                        <a onClick={()=>setShowModal(!showModal)}>Show Modal</a>
                    </li>
                    {userExists && <li>
                        <a onClick={() => auth.signOut(auth.user, () => navigate("/"))}>Sign Out</a>
                    </li>}
                </ul>
            </nav>

            <Modal
                show={showModal}
                close={()=> setShowModal(false)}>
                {/* children: */}
                <p>Nadav's Modal</p>
                <p>1 2 3 4 5</p>
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <button>Test Button 1</button>
                <button>Test Button 2</button>
            </Modal>

            <Outlet /> {/*this enables nested routes*/}
        </div>
    )
}