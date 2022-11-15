import React from "react"
import {Link} from "react-router-dom"
import homePageCss from "../css/homePage.module.css"


const Home = () => {
    return(
        <div className={homePageCss.menuBar}>
            <h1 id={homePageCss.wellcomenote}>Well Come To Container Management Platform</h1>
            <Link to="/login"><button className={homePageCss.buttonLogin}>Login</button></Link>
            <Link to="/signup"><button className={homePageCss.buttonCreateAccount}>Create account</button></Link>
            
        </div>
    )
}
export default Home;