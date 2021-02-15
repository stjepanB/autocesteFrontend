import React, { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import SignInSide from "./components/SignInSide"
import Home from "./components/Home/Home"
import Registration from "./components/Registration/Registration"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { TokenContextProvider } from "./context/TokenContext"
import RegisterVehicle from "./components/RegisterVehicle"
import AdminHome from "./components/AdminHome/AdminHome"
import Prices from "./components/AdminHome/Prices"
import Reports from "./components/AdminHome/Reports"

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tmpIsAdmin = localStorage.getItem('admin');
    console.log(token + " " + isLoggedIn)
    console.log(isAdmin)
    if (token) {
      setIsLoggedIn(true)
    }
    if (tmpIsAdmin === "true") {
      setIsAdmin(true)
    }
    if (tmpIsAdmin === "false") {
      setIsAdmin(false)
    }
  }, [])

  return (
    <div>
      <TokenContextProvider>
        {
          isLoggedIn ?
            isAdmin ?
              <BrowserRouter>
                <Navbar isAdmin={true} />
                <Switch>
                  <Route exact path="/" component={AdminHome} />
                  <Route path="/prices" component={Prices} />
                  <Route path="/reports" component={Reports} />
                </Switch>
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
                <Route path="/register" exact component={Registration} />
                <Route
                  path='/'
                  render={() => (
                    <SignInSide
                      setIsLoggedIn={(isLoggedIn) => setIsLoggedIn(isLoggedIn)}
                      setIsAdmin={(isAdmin) => setIsAdmin(isAdmin)}
                    />
                  )}
                />
              </Switch>
            </BrowserRouter>
        }
      </TokenContextProvider>
    </div >
  );
}
