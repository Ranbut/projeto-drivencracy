import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { pollSchema } from '../schemas/pollSchema.js'
import { GetPoll } from '../controllers/getPollController.js';
import { PostPoll } from '../controllers/postPollController.js';

const router = Router();

router.get('/poll', GetPoll);
router.post('/poll', validateSchema(pollSchema), PostPoll);

export default router;