import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";

export default function Main(){

    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/profile' component={Profile} />
            </Switch>
        </Router>
    )
}
