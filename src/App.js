import React, {useState} from "react"
import Navbar from "./components/Navbar"
import SignInSide from "./components/SignInSide"
import Registration from "./components/Registration"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginMe = (bool) => {
    setIsLoggedIn(bool)
  };
  
  return (
    <div>
    {
      isLoggedIn ?
        <Navbar />
      : <Registration />  //<SignInSide login={loginMe}/>

    }
    </div>
  );
}

export default App;
