import React, {useRef, useState} from "react"
import FormField from "./FormField";
import {useAuth} from "../auth/Auth";
import {useNavigate, useLocation} from 'react-router-dom'
import '../style.css'

const AuthForm = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        if (!isLoginForm) {
            data.username = usernameRef.current.value
        }
        console.log('AuthForm submit data:', data)
        if (validateData(data)){
            //call API and handle response
            console.log('AuthForm :: handleSubmit :: signing in')
            await auth.signIn({email: data.email}, ()=> {
                console.log('App2 signIn cb done. auth:', auth)
                navigate(from, { replace: true })
            })
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
            <p className='auth-text'>You need to be connected in order to proceed</p>
        <div className='auth-container form-container'>
            <form onSubmit={handleSubmit}>
                {!isLoginForm && <FormField ref={usernameRef} label="Username:" type="text" isRequired={true}/>}
                <FormField ref={emailRef} label="Email:" type="email" isRequired={true}/>
                <FormField ref={passwordRef} label="Password:" type="password" isRequired={true}/>
                <div>
                    <button type="submit">{buttonText}</button>
                </div>
            </form>
            <p>Switch to <a onClick={()=> {
                setFormType(isLoginForm ? 'register' : 'login')
                setIsLoginForm(!isLoginForm)
            }}>{switchTo}</a></p>
        </div>
        </div>

    );
}

export default AuthForm