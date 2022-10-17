import { useState, createContext} from "react";
import axios from "axios";
import "./loginPage.css";
export const userContext = createContext();

    //if you want to run any fun after return then use useEffect(Hook) fun/method
    //useEffect fun/method will excute directly after the completeion of return to browser this is called life cycle.
    //useEffect return only once when we not give any dependency's
    //it will take two parameters one is function and second is dependency's.


function Login(){
    const [details, setDetails] = useState();
    //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
   //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
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
        //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.
        axios.post('http://localhost:9000/login', credentials).then(
            //By using axios we can make an request to backend like an API call.
            function (response) {
            if(response.data === "InvalidCredentailsPleaseCheckMobileNumberANdPassword"){
                setCredentialsErr(true)
            }else{
                setCredentialsErr(false)
                setDetails(response.data)
                console.log(details)
                
                
                
            
            }
        })
    }
    return( 
        <div>
            <form onSubmit={userCredentialsSubmitHandler}>
                {credentialsErr ? <div>Invalid Credentails Please check the mob and password</div>: null}
                <input type="text" placeholder="mobile number" name="mobileNumber" value={mobileNumber} onChange={updateHandler}/><br/>
                <input type="password" placeholder="password" name="password" value={password} onChange={updateHandler}/><br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}


export default Login;