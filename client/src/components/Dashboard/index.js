import React from "react"
import {Link, Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <div className='topnav' style={{background: '#d7d7ee'}}>
            <Link to="view">View Sent Emails</Link>
            <Link to="send">Send New Email</Link>
            <Outlet /> {/*this enables nested routes*/}
        </div>
    )
}

export default Dashboard