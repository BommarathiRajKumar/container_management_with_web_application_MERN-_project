import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "./HomePage"
import Signup from "./Signup"
//import Login from "./Login"
import Profile from "./Profile"



import { useState } from "react";
import axios from "axios";
import "./loginPage.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </BrowserRouter>
     
    </div>
);



//import Profile from "./Profile";

function Login(){
    const [details, setDetails] = useState();
    const[credentialsErr, setCredentialsErr] = useState();
     
    const [credentials, setCredentails] = useState({
        mobileNumber: '',
        password: ''

    })
    const {mobileNumber, password} = credentials;
    const updateHandler = e => {
        setCredentails({...credentials,[e.target.name]:e.target.value})
    }
    const userCredentialsSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:9000/userProfileDetailsLoad', {credentials}).then(
            function (response) {
            if(response.data === "InvalidCredentailsPleaseCheckMobileNumberANdPassword"){
                setCredentialsErr(true)
            }else{
                setCredentialsErr(true)
                setDetails(response.data)
                console.log(details)
                return <Profile details = {details}/>;
                //window.location.replace('http://localhost:3000/profile')
                
            }
        })
    }
    
   
    return(
        <div>
            <form onSubmit={userCredentialsSubmitHandler}>
                {credentialsErr ? <div>Invalid Credentails Please Check Mobile Number ANd Password</div>: null}
                <input type="text" placeholder="mobile number" name="mobileNumber" value={mobileNumber} onChange={updateHandler}/><br/>
                <input type="password" placeholder="password" name="password" value={password} onChange={updateHandler}/><br/>
                <input type="submit" value="Login"/>

                {credentialsErr ?<Profile/>:null}
            </form>
        </div>
    )
}

export default Login;


  