import React, {useEffect, useRef, useState} from "react"
import FormField from "../FormField";
import {useAuth} from "../../auth/Auth";
import {useNavigate, useLocation, Navigate, Link} from 'react-router-dom'
import '../../style.css'
import {useToast} from "../../toast";

const LoginForm = () => {
    const [formType, setFormType] = useState('login')
    const [isLoginForm, setIsLoginForm] = useState(true)
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const buttonText = formType.charAt(0).toUpperCase() + formType.slice(1)
    const navigate = useNavigate()
    const location = useLocation();
    const auth = useAuth();
    const from = location.state?.from?.pathname || "/";
    const toast = useToast()
    const success = 'Successfully signed in. Redirecting...'
    const fail = 'Failed sign-in attempt.'

    // if (auth.user) {
    //     console.log('already connected... redirecting!!!!!')
    //     // Redirect them to the /login page, but save the current location they were
    //     // trying to go to when they were redirected. This allows us to send them
    //     // along to that page after they login, which is a nicer user experience
    //     // than dropping them off on the home page.
    //     return <Navigate to="/" state={{ from: location }} replace />;
    // }

    const afterSignIn = (status) => {
        const toastProps = status ? ['success', success, () => navigate(from, { replace: true })] : ['fail', fail]
        toast.open(...toastProps)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        if (!isLoginForm) {
            credentials.username = usernameRef.current.value
        }
        if (validateData(credentials)){
            //const credentials = {email: data.email, password: data.password}
            isLoginForm ? await auth.signIn(credentials, afterSignIn) : await auth.signUp(credentials, afterSignIn)
        }
    };

    const validateData = (data) => {
        for (const val of Object.values(data)){
            if (!val.trim()) {
                return false
            }
        }
        return true
    }

    const switchTo = isLoginForm ? 'Register' : 'Login'

    return (
            <div>
                {auth.user ?
                    <>
                        <p className='auth-text'>Nothing to do here. Already logged in...</p>
                        <Link to="/" state={{ from: location }} replace><p>Home</p></Link>
                    </> :
                <>
                    <p className='auth-text'>You must be logged-in in order to proceed</p>
                    <div className='auth-container form-container'>
                        <form onSubmit={handleSubmit}>
                            {!isLoginForm && <FormField ref={usernameRef} label="Username:" type="text" isRequired={true}/>}
                            <FormField ref={emailRef} label="Email:" type="email" isRequired={true}/>
                            <FormField ref={passwordRef} label="Password:" type="password" isRequired={true}/>
                            <button type="submit">{buttonText}</button>
                        </form>
                        <p>Switch to <a onClick={()=> {
                            setFormType(isLoginForm ? 'register' : 'login')
                            setIsLoginForm(!isLoginForm)
                        }}>{switchTo}</a></p>
                    </div>
                </>}
            </div>


    );
}

export default LoginForm