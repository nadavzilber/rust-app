import {createContext, useContext, useState} from "react";
import {useLocation, Navigate} from 'react-router-dom';

export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    console.log('Auth :: RequireAuth :: auth.user?', auth.user)
    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}


/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    async signIn (callback) {
        console.log('fakeAuthProvider signIn')
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    async signOut(callback) {
        console.log('fakeAuthProvider signOut')
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

const AuthContext = createContext(fakeAuthProvider)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const signIn = async (newUser, callback) => {
        console.log('AuthContext signIn')
        await fakeAuthProvider.signIn(() => {
            setUser(newUser)
            callback()
        })
    }

    const signOut = async (callback) => {
        console.log('AuthContext signOut')
        await fakeAuthProvider.signOut(() => {
            setUser(null)
            callback()
        })
    }

    const value = { user, signIn, signOut };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { fakeAuthProvider };
