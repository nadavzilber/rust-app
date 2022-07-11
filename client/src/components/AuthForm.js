import React, {useRef, useState} from "react"
import FormField from "./FormField";
import {useAuth} from "../auth/Auth";
import {useNavigate, useLocation} from 'react-router-dom'

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#3e4462',
    width: '220px',
    display: 'block'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#4e7294',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block',
    cursor: 'pointer'
};

const authFormToggleLinkStyle = {
    color: 'red',
    cursor: 'pointer'
}

const AuthForm = ({toggleAuthForm=null}) => {
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
    console.log('App2 auth:', auth, from)

    // const handleSubmit = async () => {
    //     await auth.signIn(()=> console.log('App2 signIn cb done. auth:', auth))
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        if (!isLoginForm) {
            data.username = usernameRef.current.value
        }
        console.log('data:', data)
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
            <form style={formStyle} onSubmit={handleSubmit}>
                {!isLoginForm && <FormField ref={usernameRef} label="Username:" type="text" isRequired={true}/>}
                <FormField ref={emailRef} label="Email:" type="email" isRequired={true}/>
                <FormField ref={passwordRef} label="Password:" type="password" isRequired={true}/>
                <div>
                    <button style={submitStyle} type="submit">{buttonText}</button>
                </div>
            </form>
            <p>Switch to <a style={authFormToggleLinkStyle} onClick={()=> {
                setFormType(isLoginForm ? 'register' : 'login')
                setIsLoginForm(!isLoginForm)
            }}>{switchTo}</a></p>
        </div>
    );
}

export default AuthForm