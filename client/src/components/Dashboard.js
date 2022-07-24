import React from "react"
import {Link, Outlet} from "react-router-dom";
import '../style.css'

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <div className='navbar'>
                <ul className='navbar-links'>
                    <li>
                        <Link to="view">View Sent Emails</Link>
                    </li>
                    <li>
                        <Link to="send">Send New Email</Link>
                    </li>
                </ul>
            </div>
            <Outlet /> {/*this enables nested routes*/}
        </div>
    )
}

export default Dashboard