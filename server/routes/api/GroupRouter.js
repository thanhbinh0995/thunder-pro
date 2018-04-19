import {Router} from 'express';
import {GroupController} from '../../controllers/api';

const router = Router();

router.route('/index').get(GroupController.index);
router.route('/:userId').get(GroupController.getGroupsByUser);
router.route('/:userId/:friendId').get(GroupController.makeFriendWithUser);

export default router;