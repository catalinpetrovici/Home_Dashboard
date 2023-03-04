import express from 'express';
import { healthcheck } from './healthcheck.handlers';

const router = express.Router();

router.get('/healthcheck', healthcheck);

export default router;
