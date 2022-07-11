import React from "react"

const AuthStatus = ({isConnected}) => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center'
    }

    const sharedStyle = {
        borderRadius: '45%',
        height: '10px',
        width: '10px',
        padding: '3px',
        margin: '8px 8px 0 8px'
    }

    const connectedStyle = {...sharedStyle, background: 'green'}

    const unconnectedStyle = {...sharedStyle, background: 'red'}

    return (
        <div style={containerStyle}>
            {isConnected ? <> <div style={connectedStyle}></div>Connected</> :
                <> <div style={unconnectedStyle}></div>Not Connected</>}
        </div>
    )
}

export default AuthStatus