import { useContext } from "react";
import {userContext} from "./Login.js";


function Profile(){
    const details = useContext(userContext);
    return(
        <div>
           <div>
            checking
            {details}
            </div>
        </div>
    )
}

export default Profile;