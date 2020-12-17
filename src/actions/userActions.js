import axios from "axios"
import url from "../properties/constants";


export default async function login(us,pass) {
    const formData = {
        username: us,
        password: pass
    }
    try{    
        const response = await axios.post(url.login,formData, {withCredentials:true})          
        console.log(response.headers)
        var userData = {
            token: response.headers.authorization,
            isLoggedIn:true
        }
        return userData      
    }catch(error){ 
        console.log(error)
        return null
    }
}

export async function register(user){
    const formData = {
        password : user.password,
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        address: user.address,
        oib: user.oib,
        isInvalid : user.isInvalid
    }

    try{    
        const response = await axios({
            method : 'post',
            url : url.register,
            headers: {},
            data: formData
        })         
        return response    
    }catch(error){
        console.log(error)
        return null
    }
}


