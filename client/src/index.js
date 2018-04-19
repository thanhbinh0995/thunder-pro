import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute";
import {history, store} from "./helpers";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import Geolocation from "./components/geolocation/Geolocation";
import App from "./components/app";
import Profile from "./components/profile";
import "../assets/css/material-design-iconic-font.min.css";
import "../assets/css/bootstrap.css";
import "../assets/css/profile.min.css";
import "../assets/css/app.css";
import "../assets/css/app-rtl.css";
import "../assets/css/style.css";
import "../assets/css/home.css";

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={Geolocation}/>
                <PrivateRoute exact path="/chat" component={App}/>
                <PrivateRoute path="/profile" component={Profile}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
            </Switch>
        </Router>
    </Provider>

    , document.getElementById('hearti-container'));