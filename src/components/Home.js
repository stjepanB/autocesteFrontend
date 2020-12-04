import React, {useContext, useState} from "react"
import UserContext from "../context/UserContext"


export default function Home() {

    const user = useContext(UserContext)
    

    return (
        <div>
           <UserContext.Consumer>
                <h1>Home page</h1>
                <p> Token is {user.token}</p>
            </UserContext.Consumer>
        </div>
    )
}