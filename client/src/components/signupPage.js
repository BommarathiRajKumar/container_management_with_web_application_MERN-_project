import { useState } from "react";
import axios from "axios";
import signupPageCss from "../css/signupPage.module.css"
//import { Redirect } from "react-router-dom";

const Signup = () => {
    var [profileNameErr, setProfileNameErr] = useState();
    var [mobileErr, setMobileErr] = useState();
    var [emailErr, setEmailErr] = useState();
    var [passwordErr, setPasswordErr] = useState();
    var [passwordMatchErr, setPasswordMatchErr] = useState();
    var [mobileExistErr, setMobileExistErr] = useState();
    var [emailExistErr, setEmailExistErr] = useState();
    var [serverErr, setServerErr] = useState();
    var [otpRecevied, setOtpRecevied] = useState(false);
    var [invalidOtpErr, setInvalidOtpErr] = useState();

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
    const userDetailsUpdateHandler = e => {
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
        
    }

    //by this Handler we are submiting the updated details to backend and at same time we are doing form validation giving error mesg to particular error input giving by user.
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

    const otpValidateHandler = e => {
        e.preventDefault();
        setInvalidOtpErr(false);
        setServerErr(false);

        axios.post('http://localhost:9000/otpValidate', {userDetails}).then((response) =>{
            if(response.status === 200){
                alert("user Created Successfully")
                window.location.replace("http://localhost:3000/login")
                
            }else{
                setServerErr(true);
            }
        }).catch((err) => {
            if(err.response.status === 400){
                setInvalidOtpErr(true);
            }else if(err.response.status === 500){
                setServerErr(true);
            }
        })
    }

    return(
        <div style={{position: "absolute", left: 600}}>
            <h1 className={signupPageCss.divColor}>New User Signup</h1>
            {otpRecevied === false? 
                <form method="post" onSubmit={userDeatilsSubmitHandler}>
                    {profileNameErr ? <div className={signupPageCss.error}>profileName should not contain white spaces</div>:null} 
                    {mobileErr ? <div className={signupPageCss.error}>Invalid mobile number please check it</div>:null}
                    {emailErr ? <div className={signupPageCss.error}>Invalid email</div>:null}
                    {passwordErr ? <div className={signupPageCss.error}>Password must be (8 to 15 charecters) with 'A-Z,a-z,@,#,$,%.</div>:null}
                    {passwordMatchErr ?<div className={signupPageCss.error}>password and confirm password not matched</div>:null}
                    {mobileExistErr ?<div className={signupPageCss.error}>provided mobile number is already exists.</div>:null}
                    {emailExistErr ? <div className={signupPageCss.error}>provided email is already exists.</div>:null}
                    {serverErr ?<div className={signupPageCss.error}>Internall Server Error please try again by refreshing the page.</div>:null}
                    <br/>
                    <div className={signupPageCss.divColor}>ProfileName</div>
                    <input type="text" className={signupPageCss.input} name="profileName" value={profileName} onChange={userDetailsUpdateHandler}/><br/><br/>
                    <div className={signupPageCss.divColor}>MobileNumber</div>
                    <input type="text" className={signupPageCss.input} name="mobileNumber" value={mobileNumber} onChange={userDetailsUpdateHandler}/><br/><br/>
                    <div className={signupPageCss.divColor}>Email</div> 
                    <input type="email" className={signupPageCss.input} name="email" value={email} onChange={userDetailsUpdateHandler}/><br/><br/>
                    <div className={signupPageCss.divColor}>Password</div>
                    <input type="password" className={signupPageCss.input} name="password" value={password} onChange={userDetailsUpdateHandler}/><br/><br/>
                    <div className={signupPageCss.divColor}>ConfirmPassword</div>
                    <input type="password" className={signupPageCss.input} name="confirmPassword" value={confirmPassword} onChange={userDetailsUpdateHandler}/><br/><br/>
                    <br/>
                    <button className={signupPageCss.buttonSubmit}>Submit</button>
                </form>
            :null}

            {otpRecevied === true?
                <form method="post" onSubmit={otpValidateHandler}>
                    <div style={{color: "aqua"}}>Please Enter the otp recevied by mobile number.</div><br/>
                    {invalidOtpErr ?<div className={signupPageCss.error}>Invalid OTP.</div>:null}
                    {serverErr ?<div className={signupPageCss.error}>Internall Server Error please try again by refreshing the page.</div>:null}
                    <input type="text" className={signupPageCss.input} placeholder="OTP" name="otp" value={otp} onChange={userDetailsUpdateHandler} style={{width: 200}}/>
                    <div id={signupPageCss.divSpace}></div>
                    <button className={signupPageCss.buttonValidate}>Validate</button>
                </form>
            :null}
        </div>
    )
}


export default Signup; 