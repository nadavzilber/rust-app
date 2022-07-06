import React, {useRef} from "react"
import FormField from "./FormField";
import {REGISTRATION_FORM} from "../constants";

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

const AuthForm = ({formType, toggleAuthForm, authFormTypeOpposite}) => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const buttonText = formType === REGISTRATION_FORM ? 'Register' : 'Login'

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        if (formType === REGISTRATION_FORM) {
            data.username = usernameRef.current.value
        }
        console.log('data:', data)
        if (validateData(data)){
            //submitHandler(data)
            //call API and handle response
            setTimeout(() => handleResponse(), 2000)
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

    const handleResponse = (res) => {
        console.log('handleResponse')
        //if (res.status === 200 && res.success)
    }

    const capitalize = () => formType.charAt(0).toUpperCase() + formType.slice(1)

    return (
        <div>
            <form style={formStyle} onSubmit={handleSubmit}>
                {formType == REGISTRATION_FORM && <FormField ref={usernameRef} label="Username:" type="text" isRequired={true}/>}
                <FormField ref={emailRef} label="Email:" type="email" isRequired={true}/>
                <FormField ref={passwordRef} label="Password:" type="password" isRequired={true}/>
                <div>
                    <button style={submitStyle} type="submit">{buttonText}</button>
                </div>
            </form>
            <p>Switch to <a style={authFormToggleLinkStyle} onClick={toggleAuthForm}>{authFormTypeOpposite}</a></p>
        </div>
    );
}

export default AuthForm