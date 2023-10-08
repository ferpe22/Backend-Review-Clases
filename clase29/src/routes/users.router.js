import { Router } from 'express';
import { getUser, getUserById, saveUser } from '../controllers/users.controllers.js';

const router = Router();

router.get('/', getUser);
router.get('/:uid', getUserById);
router.post('/', saveUser);

export default router;