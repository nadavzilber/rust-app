import React from 'react'
import {useAuth} from "../../auth/Auth";

export const ViewProfile = () => {
    const auth = useAuth()
    return (
        <div>
            {Object.entries(auth.user).map(([k,v]) => <p key={k}>{k}: {v}</p>)}
        </div>)
}