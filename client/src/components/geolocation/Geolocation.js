import React from "react";
import {geolocated} from "react-geolocated";
import Home from '../home/HomePage';
import SideNav from "../common/SideNav";
import Header from "../common/Header";
class Geolocation extends React.Component {
    render() {
        if (this.props.coords) {
            return (
                <Home latitude={this.props.coords.latitude} longitude={this.props.coords.longitude} />
            )
        }
        return (
            <div>
                <div id="app-site">
                    <div className="app-main">
                        <div className="app-container fixed-drawer">
                            <SideNav/>
                            <div className="app-main-container">
                                <div className="app-header">
                                    <Header/>
                                </div>
                                <main className="app-main-content-wrapper">
                                    <div className="app-main-content">
                                        <div className="app-wrapper app-wrapper-module">
                                            <h2>Cannot Get Location</h2>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation);