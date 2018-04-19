import Express from 'express';
import {webAppController} from '../controllers';

const router = Express.Router();

router.route('*').get(webAppController.index);

export default router;