import {Router} from "express";
import {AuthController} from "../../controllers/api";
import {UserController} from "../../controllers/api";

const router = Router();

router.route('/login').post(AuthController.login);
router.route('/register').post(UserController.create);

export default router;