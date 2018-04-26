class PushNotification {
    constructor() {
        this.commentList = [];
        this.messageText = '';
        this.swReg = null;
        this.publicServerKey = 'BCi3AfGJVfxoDOB3JGMbvyAzOBJ8KiqRrUn6OhYaWsfUrwOq6h9hI1x464AQaVyaNFhAGNi0thYCtSxRmy0P8SI';
    }

    getComments = () => {
        return fetch('https://pirates-b74f7.firebaseio.com/commentList.json')
            .then((response) => response.json())
            .then((data) => {
                this.commentList = data;
                return this.commentList;
            });
    };

    postComment = () => {
        return localStorage.getItem('comment').then((val) => {
            let d = new Date();
            let data = {
                commentText: val,
                date: (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
            };

            return fetch("https://pirates-b74f7.firebaseio.com/commentList.json",
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }).then(() => {
                localStorage.removeItem('comment');
                return data;
            });
        });
    };

    registerServiceWorker = () => {
        const self = this;
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').then((registration) => {
                self.swReg = registration;
            }, function (err) {
                console.log(err);
            });

        } else {
            alert('No service worker support in this browser');
        }
    };

    subscribeToPush = () => {
        const options = {
            userVisibleOnly: true,
            applicationServerKey: this.urlB64ToUint8Array(this.publicServerKey)
        };
        navigator.serviceWorker.ready.then((reg) => {
            return reg.pushManager.getSubscription().then((subscription) => {
                if (subscription === null) {
                    return reg.pushManager.subscribe(options);
                } else {
                    let promise = new Promise((resolve, reject) => {
                        resolve(subscription);
                    });
                    return promise;
                }
            });
        })
            .then((subscription) => {
                fetch('http://localhost:8081/register', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                });
                console.log('subscription: ', JSON.stringify(subscription));
                return subscription;
            })
            .catch((error) => {
                alert('error: ' + error);
            });
    };

     urlB64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

export default new PushNotification();