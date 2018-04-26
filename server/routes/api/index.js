import {Router} from "express";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";
import ChatRouter from "./ChatRouter";
import GroupRouter from "./GroupRouter";
import webpush from "web-push";

const router = Router();

router.use('/users', AuthRouter);
// router.use('/posts', IsAuth.index, PostRouter);
router.use('/users', UserRouter);
router.use('/messages', ChatRouter);
router.use('/groups', GroupRouter);


webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
webpush.setVapidDetails(
    "mailto:thanhbinh0995@gmail.com",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

console.log(process.env.PUBLIC_VAPID_KEY);
const testData = {
    title: "Thunder server",
    body: "Success push notification!",
    icon: "favicon.png"
};

let subscription;
let pushIntervalID;

router.post("/push/register", (req, res, next) => {
    subscription = req.body;
    res.sendStatus(201);

    pushIntervalID = setInterval(() => {
        webpush.sendNotification(subscription, JSON.stringify(testData))
            .then(function () {
                console.log('Notification sent');
            })
            .catch((e) => {
                console.log('Error sending Notification: ' + e);
                clearInterval(pushIntervalID)
            })
    }, 1000)
});

router.delete("/push/unregister", (req, res, next) => {
    subscription = null;
    clearInterval(pushIntervalID);
    res.sendStatus(200)
});

export default router;