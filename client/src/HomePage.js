import React from "react"
import {Link} from "react-router-dom"
import { Helmet } from "react-helmet";


function Home(){
    return(
        <div>
            <Helmet>
              <style>{"body { background-color: grey; }"}</style>
            </Helmet>
            Well come to ci/cd without pipeline has  code...
            <Link to="/signup"><div>Signup</div></Link>
            <Link to="/login"><div>Login</div></Link>
            <Link to="/profile"><div>Profile</div></Link>
            
            
            

        </div>
    )
}
export default Home;