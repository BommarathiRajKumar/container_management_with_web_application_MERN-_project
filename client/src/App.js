import {React} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "./components/homePage"
import Signup from "./components/signupPage"
import Login from "./components/loginPage"
import Profile from "./components/profilePage";




const App = () => {
    return(
        <div>
            
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/profile" exact component={Profile} />
                </Switch>
            </BrowserRouter>

        </div>
    )
    
}
export default App;
