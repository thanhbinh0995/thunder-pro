import {Router} from "express";
import {UserController} from "../../controllers/api";

const router = Router();

router.route('/index').get(UserController.index);
router.route('/:id').get(UserController.view);
router.route('/:id').put(UserController.update);
router.route('/check/:email').get(UserController.checkEmailExist);
router.route('/:id/like').post(UserController.requestLikeFriend);
router.route('/:id/location').put(UserController.updateLocation);
router.route('/:id/suggest').get(UserController.suggestFriend);
router.route('/:id/avatar').post(UserController.uploadAvatar);

export default router;