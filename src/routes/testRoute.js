import { Router } from 'express';
import { Test } from '../controllers/testController.js';

const router = Router();

router.get('/test', Test);

export default router;