import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/Auth";
import AuthStatus from "./AuthStatus";

export const Layout = () => {
    const auth = useAuth();
    const navigate = useNavigate()
    const layoutStyle = {margin: '12px', border: '1px solid white', color: 'black', backgroundColor: 'white'}
    return (
        <div style={layoutStyle}>
            <AuthStatus isConnected={auth?.user}/>
            {auth?.user && <p>Welcome {auth.user.email}!{" "}</p>}
            <ul>
                {auth?.user && <li>
                    <button onClick={() => auth.signOut(() => navigate("/"))}>Sign out</button>
                </li>}
                <li>
                    <Link to="/">Public Page</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page - requires login</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    )
}