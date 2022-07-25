import React, {useRef, useState} from 'react'
import {TooltipLabel} from "../TooltipLabel";
import {updateProfile} from "../../Api";
import {useToast} from "../../toast";
import {useAuth} from "../../auth/Auth";

export const EditProfile = () => {
    const auth = useAuth();
    const [username, setUsername] = useState(auth.user.username || '')
    const [password, setPassword] = useState(auth.user.password || '')
    const toast = useToast()
    const saveButton = useRef()
    const enableSaveButton = () => saveButton.current.disabled = false

    const handleSave = async (ev) => {
        ev.preventDefault()
        saveButton.current.disabled = true
        const profile = {email: auth.user.email, username, password}
        const res = await updateProfile(profile)
        const success = 'Profile was successfully updated'
        const fail = 'Profile update has failed'
        const toastProps = []
        res.status ? toastProps.push('success', success, enableSaveButton) : toastProps.push('fail', fail, enableSaveButton)
        toast.open(...toastProps)
    }

    return (
        <div className="form-container">
            <p>Edit Profile</p>
            <form className="form">
                <TooltipLabel tooltip={'Anything you want'} htmlFor={"username"}>Username</TooltipLabel>
                <input type="text" id="username" name="username" placeholder="Username" value={username}
                       onChange={(ev) => setUsername(ev.target.value)}/>
                <TooltipLabel tooltip={'"password123" is a bad idea'} htmlFor={"password"}>Password</TooltipLabel>
                <input type="password" id="password" name="password" placeholder="Password" value={password}
                       onChange={(ev) => setPassword(ev.target.value)}/>
                <button ref={saveButton} onClick={(ev) => handleSave(ev)}>Save Changes</button>
            </form>
    </div>)
}