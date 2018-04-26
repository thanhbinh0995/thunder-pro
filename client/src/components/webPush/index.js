import React, {Component} from "react";
import PropTypes from "prop-types";
import {urlB64ToUint8Array} from "./Utility";

let swRegistration = null;

class WebPush extends Component {
    constructor(props) {
        super(props);

        this.onRegisterServiceWorker = this.onRegisterServiceWorker.bind(this)
        this.onSubscribeUser = this.onSubscribeUser.bind(this)
    }

    componentWillMount() {
        if (swRegistration === null) {
            this.onRegisterServiceWorker()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.subscribeUserEnabled !== nextProps.subscribeUserEnabled && nextProps.subscribeUserEnabled) {
            this.onSubscribeUser()
        }
    }

    onSubscribeUser() {
        if (swRegistration === null) {
            return
        }

        const onUpdateSubscriptionOnServer = this.props.onUpdateSubscriptionOnServer;
        const onSubscriptionFailed = this.props.onSubscriptionFailed;
        const applicationServerPublicKey = this.props.applicationServerPublicKey;

        swRegistration.pushManager.getSubscription()
            .then(subscription => {
                const isSubscribed = !(subscription === null);
                if (isSubscribed) {
                    onUpdateSubscriptionOnServer(subscription)
                } else {
                    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
                    swRegistration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: applicationServerKey
                    })
                        .then(subscription => {
                            console.log('User is subscribed.');
                            if (onUpdateSubscriptionOnServer) {
                                onUpdateSubscriptionOnServer(subscription)
                            }
                        })
                        .catch(err => {
                            console.log('Failed to subscribe the user: ', err);
                            if (onSubscriptionFailed) {
                                onSubscriptionFailed(err)
                            }
                        });
                }
            })
    }

    onRegisterServiceWorker() {
        navigator.serviceWorker.register('sw.js')
            .then(swReg => {
                console.log('Service Worker is registered', swReg);

                swRegistration = swReg;
            })
    }

    render() {
        return (<div/>)
    }
}

WebPush.propTypes = {
    subscribeUserEnabled: PropTypes.bool.isRequired,
    applicationServerPublicKey: PropTypes.string.isRequired,
    onUpdateSubscriptionOnServer: PropTypes.func,
    onSubscriptionFailed: PropTypes.func,
};

export default WebPush;
