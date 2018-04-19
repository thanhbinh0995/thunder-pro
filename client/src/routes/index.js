import React from "react";
import {Route, Switch} from "react-router-dom";
import {PrivateRoute} from "../components/PrivateRoute";
import LoginPage from "../components/login/LoginPage";
import RegisterPage from "../components/register/RegisterPage";
import Profile from "../components/profile";
import App from "../components/app";
import Geolocation from "../components/geolocation/Geolocation";

const TopLevelRoutes = () => (
    <Switch>
        <PrivateRoute exact path="/" component={Geolocation}/>
        <PrivateRoute exact path="/chat" component={App}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/register" component={RegisterPage}/>
    </Switch>
);

export default TopLevelRoutes;
