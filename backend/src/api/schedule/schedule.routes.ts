import express from 'express';
import { getAll, add, update, remove } from './schedule.handlers';

const router = express.Router();

router.get('/', getAll);
router.post('/', add);
router.patch('/', update);
router.delete('/', remove);

export default router;
