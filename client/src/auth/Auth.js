import {createContext, useContext, useState} from "react";
import {useLocation, Navigate} from 'react-router-dom';
import {signUp, signIn, signOut} from "../Api";

const authProvider = {
    async signUp (credentials, callback) {
        const res = await signUp(credentials)
        callback(res)
    },
    async signIn (credentials, callback) {
        const res = await signIn(credentials)
        callback(res)
    },
    async signOut(credentials, callback) {
        const res = await signOut(credentials)
        callback(res)
    }
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const signUp = async (credentials, callback) => {
        await authProvider.signUp(credentials,
            (res) => {
                console.log('SignUp updating user:',res.status, credentials)
                setUser(res.status ? credentials : null)
                callback(res.status)
            })
    }

    const signIn = async (credentials, callback) => {
        await authProvider.signIn(credentials,
            (res) => {
            console.log('SignIn updating user:',res.status, credentials)
                setUser(res.status ? {...credentials, username: res.data.username} : null)
                callback(res.status)
            })
    }

    const signOut = async (credentials, callback) => {
        console.log('AuthProvider signOut args:',credentials, callback)
        await authProvider.signOut(credentials,
            (signOutStatus) => {
                signOutStatus && setUser(null)
                callback(signOutStatus)
        })
    }

    const value = { user, signUp, signIn, signOut };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const AuthContext = createContext(authProvider)

export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export const useAuth = () => useContext(AuthContext)
