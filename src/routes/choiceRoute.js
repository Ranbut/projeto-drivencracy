import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { choiceSchema } from '../schemas/choiceSchema.js'
import { PostChoice } from '../controllers/postChoiceController.js';

const router = Router();

router.post('/choice', validateSchema(choiceSchema), PostChoice);

export default router;