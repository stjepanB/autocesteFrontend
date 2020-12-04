import React, {useState} from "react"
import Navbar from "./components/Navbar"
import SignInSide from "./components/SignInSide"
import Home from "./components/Home"
import Registration from "./components/Registration"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import UserContext from "./context/UserContext"

function App() {
  const [user, setUser] = useState({
    isLoggedIn : false,
    token:"",
  })

  const loginMe = (data) => {
    setUser({ 
             isLoggedIn:data.isLoggedIn,
             token: data.token
            })
  };
  
  return (
    <div>
    <UserContext.provider value={user}>
    {
      user.isLoggedIn ?
      
        <Router>
           <Navbar />
           <Route exact path="/" component={Home} />
        </Router>
      
      : 
        <Router>
          <Switch>
            <Route path="/register" exact component={Registration}/>
            <Route path="/" 
                        component={() =>(
                          <SignInSide login={loginMe} />
                        )}
            />
          </Switch>
        </Router>
       
    }
    </UserContext.provider>
    </div>
  );
}

export default App;
