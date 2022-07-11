import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/Auth";
import AuthStatus from "./AuthStatus";

export const Layout = () => {
    const auth = useAuth();
    const navigate = useNavigate()
    const userExists = !!auth?.user
    const layoutStyle = {margin: '12px', border: '1px solid white', color: 'black', backgroundColor: 'white'}
    return (
        <div>
            <nav style={layoutStyle}>
                <AuthStatus isConnected={userExists}/>
                {userExists && <p>Welcome {auth.user.email}!{" "}</p>}
                <ul>
                    {userExists && <li>
                        <button
                            onClick={() => auth.signOut(() => navigate("/"))}>
                            Sign out
                        </button>
                    </li>}
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="emails">Emails Dashboard Page (Protected)</Link>
                    </li>
                </ul>
            </nav>
            {/*this enables nested routes*/}
            <Outlet />
        </div>
    )
}