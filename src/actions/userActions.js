import axios from "axios"



export default async function login(us,pass) {
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

        return userData      
    }catch(error){
        console.log(error)
    }
}


