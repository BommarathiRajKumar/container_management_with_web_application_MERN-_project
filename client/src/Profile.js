import {useContext,useState, useEffect} from 'react'
import {store} from "./App"
import {Redirect} from "react-router-dom"
import axios from 'axios'


function Profile(){
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:9000/profile",{
            headers: {
                'x-token' : token
            }
        }).then(resp => setData(resp.data)).catch((err) => console.log(err))

    })


    if(!token){
        return <Redirect to="/login" />
    }
    return(
        <div>
            {
                data&&
                <center>
                    well come : {data.profileName}
                    <br/>
                    <button onClick={() => setToken(null)}>Logout</button>
                </center>
            }
        
        </div>
    )
}

export default Profile;