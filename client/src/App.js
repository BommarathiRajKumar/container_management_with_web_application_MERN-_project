import {React, createContext, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "./HomePage"
import Signup from "./Signup"
import Login from "./Login"
import Profile from './Profile';

export const store = createContext();



const App = () => {
    const [token, setToken] = useState(null);
    return(
        <div>
            <store.Provider value={[token,setToken]}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/profile" exact component={Profile} />
                    </Switch>
                </BrowserRouter>
           </store.Provider>
        </div>
    )
    
}
export default App;
