
import {Router} from 'express';
import {ChatController} from '../../controllers/chat/index';

const router = Router();

router.route('/index').get(ChatController.index);
router.route('/:groupId').get(ChatController.getMessagesByGroup);

export default router;