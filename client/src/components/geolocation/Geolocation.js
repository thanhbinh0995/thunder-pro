import React from "react";
import {geolocated} from "react-geolocated";
import Home from "../home/HomePage";
import SideNav from "../common/SideNav";
class Geolocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        const {coords} = this.props;
        const {latitude, longitude} = this.state;
        const latitudeProps = coords ?
            coords.latitude
            : latitude ?
                latitude
                : null;
        const longitudeProps = coords ?
            coords.longitude
            : longitude ?
                longitude
                : null;
        if (latitudeProps && longitudeProps) {
            return (
                <Home latitude={latitudeProps} longitude={longitudeProps}/>
            )
        }
        return (
            <div>
                <div id="app-site">
                    <div className="app-main">
                        <div className="app-container fixed-drawer">
                            <SideNav/>
                            <div className="app-main-container">
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