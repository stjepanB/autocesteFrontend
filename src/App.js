import React, {useState, useEffect} from "react"
import Navbar from "./components/Navbar"
import SignInSide from "./components/SignInSide"
import Home from "./components/Home/Home"
import Registration from "./components/Registration/Registration"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import  { TokenContextProvider } from "./context/TokenContext"
import RegisterVehicle from "./components/RegisterVehicle"
import AdminHome from "./components/AdminHome/AdminHome"

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const tmpIsAdmin = localStorage.getItem('admin');
    
    if(token){
      setIsLoggedIn(true)
    }

    if(tmpIsAdmin){
      setIsAdmin(tmpIsAdmin)
    }
  },[isLoggedIn, isAdmin])
  
  if(isLoggedIn){
    console.log(isAdmin)
  }

  return (
    <div>
      <TokenContextProvider>
      {
        isLoggedIn ?
          isAdmin ?
            <BrowserRouter>
              <Navbar />
              <Route exact path="/" component={AdminHome} />
            </BrowserRouter>
            :
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
                    <SignInSide  
                              setIsLoggedIn={(isLoggedIn) => setIsLoggedIn(isLoggedIn)} 
                              setIsAdmin= {(isAdmin) => setIsAdmin(isAdmin)}  
                    />
                  )}
              />
            </Switch>
          </BrowserRouter>
      }
      </TokenContextProvider>
    </div>
  );
}
