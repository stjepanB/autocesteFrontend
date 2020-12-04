import axios from "axios"



export async function login(us,pass,loginFunc) {
    const formData = {
        username: us,
        password: pass
    }
    try{    
        const response = await axios.post("http://localhost:18080/login",formData, {withCredentials:true})          
        var userData = {
            token: response.headers.authorization,
            isLoggedIn:true
        }

        loginFunc(userData);        
    }catch(error){
        console.log(error)
    }
}


