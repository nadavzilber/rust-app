import axios from 'axios'

export const signUp = async (credentials) => {
    const url = 'localhost:8000/auth/sign-up'
    try {
        //return await axios.post(url, {credentials})
        const randomNum = Math.floor(Math.random() * 10) + 1;
        const isSuccessful = randomNum > 4 //TODO: remove after testing
        return {status: isSuccessful}
    } catch (error) {
        //return {status: true, error}
        return {status: false, error}
    }
}

export const signIn = async (credentials) => {
    const url = 'localhost:8000/auth/sign-in'
    try {
        //return await axios.post(url, {credentials})
        const randomNum = Math.floor(Math.random() * 10) + 1;
        const isSuccessful = randomNum > 4 //TODO: remove after testing
        return {status: isSuccessful, data: {username: 'Nadav_123'}}
    } catch (error) {
        //return {status: true, error}
        return {status: false, error}
    }
}

export const signOut = async (credentials) => {
    const url = 'localhost:8000/auth/sign-out'
    try {
        return await axios.post(url, {credentials})
    } catch (error) {
        return {status: false, error}
    }
}

export const updateProfile = async (profile) => {
    const url = 'localhost:8000/user'
    try {
        return await axios.put(url, {profile})
    } catch (error) {
        return {status: false, error}
    }
}