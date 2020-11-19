import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Login from '../Auth/Login';
import Register from '../Auth/Register';


export default function root({ children }) {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route exact path='/' component={App} />
            </Switch>
        </Router>
    )
}