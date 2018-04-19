import {Router} from "express";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";
import ChatRouter from "./ChatRouter";
import GroupRouter from "./GroupRouter";
import {IsAuth} from "../../middlewares/index";

const router = Router();

router.use('/users', AuthRouter);
// router.use('/posts', IsAuth.index, PostRouter);
router.use('/users', UserRouter);
router.use('/messages', ChatRouter);
router.use('/groups', GroupRouter);

export default router;