import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Artists from "./Artists"
import Tracks from "./Tracks";

export default function Main(){
    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/profile' component={Profile} />
                <Route path='/artists' component={Artists} />
                <Route path="/tracks" component={Tracks} />
            </Switch>
        </Router>
    )
}
