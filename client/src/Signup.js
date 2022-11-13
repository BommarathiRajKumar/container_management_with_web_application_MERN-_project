import { useState } from "react";
import axios from "axios";
import "./signup.css"
//import { Redirect } from "react-router-dom";

function Signup(){
    var [profileNameErr, setProfileNameErr] = useState();
    var [mobileErr, setMobileErr] = useState();
    var [emailErr, setEmailErr] = useState();
    var [passwordErr, setPasswordErr] = useState();
    var [passwordMatchErr, setPasswordMatchErr] = useState();
    var [mobileExistErr, setMobileExistErr] = useState();
    var [emailExistErr, setEmailExistErr] = useState();
    var [serverErr, setServerErr] = useState(false);
    var [otpRecevied, setOtpRecevied] = useState(false);

    var [userDetails,setUserDetails] = useState({
        mobileNumber: '',
        email: '',
        profileName: '',
        password: '',
        confirmPassword: '',
        otp: ''

    });
    //objectDestructuring
    const {mobileNumber, email, profileName, password, confirmPassword, otp}  = userDetails

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
                    //alert("user created successfully")
                    //window.location.replace("http://localhost:3000/login");
                    setOtpRecevied(true);

                }else{
                    setServerErr(true);
                }
            }).catch((err) => {
                if (err.response.status === 400) {
                    setMobileExistErr(true);
                    setEmailExistErr(false);
                }else if(err.response.status === 401){
                    setMobileExistErr(false);
                    setEmailExistErr(true);
                }else if(err.response.status === 500){
                    setServerErr(true);
                }
            })
        }
    }

    const otpUdateHandler = e => {
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
        
    }
    const otpValidateHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:9000/otpValidate', {userDetails}).then((response) =>{
            if(response.status === 200){
                alert("user Created Successfully")
                window.location.replace("http://localhost:3000/login")
            }else{
                alert("internal server error")
            }
        }).catch((err) => {
            if(err.response.status === 400){
                alert("InvalidOtp")
            }else if(err.response.status === 500){
                setServerErr(true);
            }
        })
    }

    return(
        <div>
            <h1>New User Signup</h1>
            {otpRecevied === false? 
                <form method="post" onSubmit={userDeatilsSubmitHandler}>
                    {profileNameErr ? <div className="error">profileName should not contain white spaces</div>:null} 
                    {mobileErr ? <div className="error">Invalid mobile number please check it</div>:null}
                    {emailErr ? <div className="error">Invalid email</div>:null}
                    {passwordErr ? <div className="error">Password must be (8-15 charecters) with 'A-Z,a-z,@,#,$,%.</div>:null}
                    {passwordMatchErr ?<div className="error">password and confirm password not matched</div>:null}
                    {mobileExistErr ?<div className="error">provided mobile number is already registered</div>:null}
                    {emailExistErr ? <div className="error">provided email is already registered</div>:null}
                    {serverErr ?<div className="error">Internall Server Error please try again by refreshing the page.</div>:null}
                    <div>ProfileName</div>
                    <input type="text" className="input" name="profileName" value={profileName} onChange={updateHandler}/><br/><br/>
                    <div>MobileNumber</div>
                    <input type="text" className="input" name="mobileNumber" value={mobileNumber} onChange={updateHandler}/><br/><br/>
                    <div>Email</div> 
                    <input type="email" className="input" name="email" value={email} onChange={updateHandler}/><br/><br/>
                    <div>Password</div>
                    <input type="password" className="input" name="password" value={password} onChange={updateHandler}/><br/><br/>
                    <div>ConfirmPassword</div>
                    <input type="password" className="input" name="confirmPassword" value={confirmPassword} onChange={updateHandler}/><br/><br/>
                    <button className="button">Submit</button>
                </form>
            :null}

            {otpRecevied === true?
                <form method="post" onSubmit={otpValidateHandler}>
                    <div>Please enter otp recevied by mobile number.</div>
                    <input type="text" placeholder="OTP" name="otp" value={otp} onChange={otpUdateHandler}/>
                    <input type="submit" value="Validate"/>
                </form>
            :null}
        </div>
    )
}


export default Signup; 