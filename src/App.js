import React, {useState, useEffect} from "react"
import Navbar from "./components/Navbar"
import SignInSide from "./components/SignInSide"
import Home from "./components/Home/Home"
import Registration from "./components/Registration/Registration"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import  { TokenContextProvider } from "./context/TokenContext"
import RegisterVehicle from "./components/RegisterVehicle"

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setIsLoggedIn(true)
    }
  }, [])
  
  return (
    <div>
      <TokenContextProvider>
      {
        isLoggedIn ?
        
          <BrowserRouter>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/vehicle" component={RegisterVehicle} />
          </BrowserRouter>
        
        : 
          <BrowserRouter>
            <Switch>
              <Route path="/register" exact component={Registration}/> 
              <Route
                    path='/'
                    render={() => (
                    <SignInSide  setIsLoggedIn={() => setIsLoggedIn(!isLoggedIn)} />
                  )}
              />
            </Switch>
          </BrowserRouter>
        
      }
      </TokenContextProvider>
    </div>
  );
}
