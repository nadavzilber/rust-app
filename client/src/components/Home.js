import React from 'react'

const Home = ({setIsAuth}) => {
    return (
        <div>
            <button onClick={() => setIsAuth(false)}>Log out</button>
            <p>Home</p>
        </div>
    )
}

export default Home