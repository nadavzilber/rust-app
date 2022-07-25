import React from "react"
import {Outlet} from "react-router-dom";
import CustomLink from "../CustomLink";
import '../../style.css'

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            {/*<div className='navbar'>*/}
            {/*    <ul className='navbar-links'>*/}
            {/*        <li>*/}
            {/*            <CustomLink to="view">View Sent Emails</CustomLink>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <CustomLink to="send">Send New Email</CustomLink>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <Outlet /> {/*this enables nested routes*/}
        </div>
    )
}

export default Dashboard