import { useState } from "react";
import axios from "axios";
//import { Redirect } from "react-router-dom";

function Signup(){
    var [profileNameErr, setProfileNameErr] = useState();
    var [mobileErr, setMobileErr] = useState();
    var [emailErr, setEmailErr] = useState();
    var [passwordErr, setPasswordErr] = useState();
    var [passwordMatchErr, setPasswordMatchErr] = useState();
    var [mobileExistErr, setMobileExistErr] = useState();
    var [emailExistErr, setEmailExistErr] = useState();
    let [serverErr, setServerErr] = useState(false);
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

    //by this Handler we are submiting the updated details to backend and we are doing form validation here only.
    const userDeatilsSubmitHandler = e => {
        var space = profileName.match(/\s/g)
        if( profileName === "" || space !== null){
            e.preventDefault();
            setProfileNameErr(true);
            setMobileErr(false);
            setEmailErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if( mobileNumber.length > 10 || mobileNumber.length < 10 || isNaN(mobileNumber)){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(true);
            setEmailErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if( email === ""){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setEmailErr(true);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if(password.length < 8 || password.length > 15){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setEmailErr(false);
            setPasswordErr(true);
            setPasswordMatchErr(false);
        }else if(password !== confirmPassword){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setEmailErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(true);
        }else{
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setEmailErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);

            
            axios.post('http://localhost:9000/signup', {userDetails}).then((response) => {
                if(response.status === 200){
                    alert("user created successfully")
                    window.location.replace("http://localhost:3000/login");
                }else{
                    setServerErr(true);
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    setMobileExistErr(true);
                    setEmailExistErr(false);
                }else if(error.response.status === 401){
                    setMobileExistErr(false);
                    setEmailExistErr(true);
                }else if(error.response.status === 500){
                    setServerErr(true);
                }
            })
           
        }
        
    }
    

    return(
        <div>
            <h1>User Creation</h1>
            <form method="post" onSubmit={userDeatilsSubmitHandler}>
                {profileNameErr ? <div>profileName should not contain white spaces</div>:null} 
                {mobileErr ? <div>Invalid mobile number please check it</div>:null}
                {emailErr ? <div>Invalid email</div>:null}
                {passwordErr ? <div>Password must be (8-15 charecters) with 'A-Z,a-z,@,#,$,%.</div>:null}
                {passwordMatchErr ?<div>password and confirm password not matched</div>:null}
                {mobileExistErr ?<div>provided mobile number is already registered</div>:null}
                {emailExistErr ? <div>provided email is already registered</div>:null}
                {serverErr ?<div>Internall Server Error please try again by refreshing the page.</div>:null}
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