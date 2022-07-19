import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/Auth";
import AuthStatus from "./AuthStatus";
import '../style.css'

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
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="emails">Emails</Link>
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