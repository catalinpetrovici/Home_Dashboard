import express from 'express';
import Dashboard from './dashboard.handlers';

const router = express.Router();

router.get<{}, {}>('/', Dashboard.getData);
router.get<{}, {}>('/charts', Dashboard.getCharts);
router.post<{}, {}>('/led', Dashboard.ledControl);

export default router;
