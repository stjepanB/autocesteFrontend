import axios from "axios"
import url from "../properties/constants";


export default async function login(us, pass) {
    const formData = {
        username: us,
        password: pass
    }
    try {
        const response = await axios.post(url.login, formData, { withCredentials: true })
        var userData = {
            token: response.headers.authorization,
            isLoggedIn: true,
            isAdmin: false
        }
        const config = {
            headers: {
                Authorization: userData.token
            }
        }
        const admin = await axios.get(url.isAdmin, config)
        userData.isAdmin = admin.data;
        return userData
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function register(user) {
    const formData = {
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        oib: user.oib,
        isInvalid: user.isInvalid
    }

    try {
        const response = await axios({
            method: 'post',
            url: url.register,
            headers: {},
            data: formData
        })
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getProfile() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.get(url.profile, config)
    return response.data
}


