import {React} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "./HomePage"
import Signup from "./Signup"
import Login from "./Login"
import Profile from './Profile';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
);





  