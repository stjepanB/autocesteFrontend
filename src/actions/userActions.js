import axios from "axios"
import React from "react"


export async function login(us,pass, loginFunc) {
    const formData = {
        username: us,
        password: pass
    }
    try{    
            
        console.log(formData)
        const response = await axios.post("http://localhost:9000/login",formData, {withCredentials:true})          
        const token = response.headers.authorization

        loginFunc(true);
        return token
        
    }catch(error){
        console.log(error)
    }
}


