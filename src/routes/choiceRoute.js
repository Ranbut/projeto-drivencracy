import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { choiceSchema } from '../schemas/choiceSchema.js'
import { PostChoice } from '../controllers/postChoiceController.js';
import { GetPollIDChoice } from '../controllers/getPollIdController.js';

const router = Router();

router.get('/poll/:id/choice', GetPollIDChoice);
router.post('/choice', validateSchema(choiceSchema), PostChoice);

export default router;