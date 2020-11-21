import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { auth } from "../../firebase";
import { withRouter } from "react-router";

function Root(props) {
    console.log("Root -> props", props);
    const history = useHistory();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log("Root -> history", history);
            if (user) {
                history.push("/");
            }
        });
    }, []);
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={App} />
        </Switch>
    );
}
const WithRouterSwitch = withRouter(Root);

export default WithRouterSwitch;
