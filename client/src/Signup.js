import { useState } from "react";
import axios from "axios"

function Signup(){
    var [userDetails,setUserDetails] = useState({
        mobileNumber: '',
        email: '',
        profileName: '',
        password: '',
        confirmPassword: ''
    });
    //objectDestructuring
    const {mobileNumber, email, profileName, password, confirmPassword}  = userDetails

    //by this Handler we are updating the userDeatils varables with particular user inputs.
    const updateHandler = e => {
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
        
    }

    //by this Handler we are submiting the updated details to backend and we can do form validation here only.
    const userDeatilsSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:9000/userDetailsSaveToDb', {userDetails})
    }

    return(
        <div>
            <h1>User Creation</h1>
            <form onSubmit={userDeatilsSubmitHandler}>
                
                <input type="text" placeholder="ProfileName" name="profileName" value={profileName} onChange={updateHandler}/><br/><br/>
                <input type="text" placeholder="Mobile Number" name="mobileNumber" value={mobileNumber} onChange={updateHandler}/><br/><br/>
                <input type="email" placeholder="Mail" name="email" value={email} onChange={updateHandler}/><br/><br/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={updateHandler}/><br/><br/>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={updateHandler}/><br/><br/>
                <input type="submit"/>
            </form>
        </div>
        
    )
}


export default Signup; 