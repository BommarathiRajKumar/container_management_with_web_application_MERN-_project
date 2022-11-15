import { useState} from "react";
import axios from "axios";
import loginPageCss from "../css/loginPage.module.css";
import { Redirect } from "react-router-dom";
 
    //if you want to run any fun after return then use useEffect(Hook) fun/method
    //useEffect fun/method will excute directly after the completeion of return to browser this is called life cycle.
    //useEffect return only once when we not give any dependency's
    //it will take two parameters one is function and second is dependency's.


const Login = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
   //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
    const[credentialsErr, setCredentialsErr] = useState();
    const [serverErr, setServerErr] = useState(false);
    const [redirect, setRedirect] = useState(false);
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
        //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.
        
        axios.post("http://localhost:9000/login", {credentials}).then(
            //By using axios we can make an request to backend like an API call.
            function (response) {
            if(response.status === 200){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
            }else{
                setServerErr(true)
            }
        }).catch((err) => {
            if(err.response.status === 401){
                setCredentialsErr(true)
            }else if(err.response.status === 500){
                setServerErr(true)
            }
            
        })
    }

    if(token !== null){
        return <Redirect to="/profile" />
    }
    
    const signupRedirect = e =>{
        setRedirect(true)
    }

    if(redirect === true) {
        return <Redirect to="/signup" />
    }

    

    return( 
        <div>
             
            <h1 id={loginPageCss.h1Id}>Container Manage Platform</h1>
            <div style={{position: "absolute",top:100, left: 600}}>
                {credentialsErr ? <div className={loginPageCss.error}>Invalid Credentails Please check the mob and password</div>: null}
                {serverErr ?<div className={loginPageCss.error}>Internall Server Error please try again after some time.</div>:null}
            
            
                <form onSubmit={userCredentialsSubmitHandler} autoComplete="of">
                    <div className={loginPageCss.divColor}>Mobile Number</div>
                    <input type="text" className={loginPageCss.input} name="mobileNumber" value={mobileNumber} onChange={updateHandler} /><br/><br/>

                    <div className={loginPageCss.divColor}>
                        Password<div className={loginPageCss.space1}></div>
                        <a className={loginPageCss.forgotPassword} href="http://localhost:3000">Forgot password</a>
                    </div>
                    <input type="password" className={loginPageCss.input} name="password" value={password} onChange={updateHandler}/><br/><br/>

                    <button className={loginPageCss.buttonLogin}>Login</button><br/><br/><br/>
                </form>
            
                <div className={loginPageCss.divColor}>---------------------New to CMP?-------------------</div><br/>
                <button className={loginPageCss.buttonCreateAccount} onClick={signupRedirect}>Create an account</button>
            </div>
        </div>
    )
}


export default Login;