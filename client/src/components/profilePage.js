import {useState} from 'react'
import {Redirect} from "react-router-dom"
import axios from 'axios'


const Profile = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [data,setData] = useState(null);
    

   
    if(token === null){
        localStorage.removeItem('token')
        return <Redirect to="/login" />
    }else{
        axios.get("http://localhost:9000/profile",{
            headers:{
                'x-token' : token
            }
        }).then(resp => setData(resp.data)).catch((err) => {
            if(err.response.status === 500){
                setToken(null)
            }
        })
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