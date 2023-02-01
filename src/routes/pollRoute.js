import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { pollSchema } from '../schemas/pollSchema.js'
import { GetPoll } from '../controllers/getPollController.js';
import { PostPoll } from '../controllers/postPollController.js';
import { GetResult } from '../controllers/getPollResultController.js';

const router = Router();

router.get('/poll', GetPoll);
router.get('/poll/:id/result', GetResult);
router.post('/poll', validateSchema(pollSchema), PostPoll);

export default router;