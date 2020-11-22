import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { auth } from "../../firebase";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { setUser } from "../../store/actions";
import { Loader } from "semantic-ui-react";

function Root({ dispatch, isLoading }) {
    const history = useHistory();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            dispatch(setUser(user));
            if (user) {
                history.push("/");
            } else {
                history.push("/login");
            }
        });
    }, []);
    return isLoading ? (
        <Loader size="huge" content="Loading..." active={isLoading} />
    ) : (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={App} />
        </Switch>
    );
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,
    };
};
const WithRouterSwitch = withRouter(connect(mapStateToProps)(Root));

export default WithRouterSwitch;
