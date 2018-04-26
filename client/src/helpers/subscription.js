import axios from "axios";
import {API_ROOT, PUBLIC_KEY} from "../constants";

const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
};

export function subscribePush() {
    const convertedVapidKey = urlBase64ToUint8Array(PUBLIC_KEY);

    navigator.serviceWorker.ready.then(registration => {
        if (!registration.pushManager) {
            alert("Push Unsupported");
            return
        }

        registration.pushManager
            .subscribe({
                userVisibleOnly: true, //Always display notifications
                applicationServerKey: convertedVapidKey
            })
            .then(subscription => {
                console.log(subscription);
                axios.post(`${API_ROOT}/push/register`, subscription)
            })
            .catch(err => console.error("Push subscription error: ", err))
    })
}