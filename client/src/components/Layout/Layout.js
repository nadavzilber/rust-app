import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/Auth";
import AuthStatus from "../AuthStatus";
import './style.css'

export const Layout = () => {
    const auth = useAuth();
    const navigate = useNavigate()
    const userExists = !!auth?.user

    return (
        <div>
            <nav className='topnav'>
                <AuthStatus isConnected={userExists}/>
                {userExists && <p>Welcome {auth.user.email}!{" "}</p>}
                <ul className='layout-link-list'>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="emails">Emails</Link>
                    </li>
                    {userExists && <li>
                        <a onClick={() => auth.signOut(() => navigate("/"))}>Sign Out</a>
                        {/*<button*/}
                        {/*    className='link-button'*/}
                        {/*    onClick={() => auth.signOut(() => navigate("/"))}>*/}
                        {/*    Sign out*/}
                        {/*</button>*/}
                    </li>}
                </ul>
            </nav>
            {/*this enables nested routes*/}
            <Outlet />
        </div>
    )
}