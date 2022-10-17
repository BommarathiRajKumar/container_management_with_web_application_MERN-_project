import React from "react"
import {Link} from "react-router-dom"
//import { Helmet } from "react-helmet";


function Home(){
    return(
        <div>
            Well come to container management platform...
            <Link to="/signup"><div>Signup</div></Link>
            <Link to="/login"><div>Login</div></Link>
        </div>
    )
}
export default Home;