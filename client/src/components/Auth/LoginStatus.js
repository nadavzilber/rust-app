import React from "react"

const LoginStatus = ({isConnected}) => {
    const clsName = isConnected ? 'connected' : 'disconnected'
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    return (
            <div className='status-container'>
                <div className={`status-circle ${clsName}`}></div>
                {capitalize(clsName)}
            </div>
    )
}

export default LoginStatus