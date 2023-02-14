import express from 'express';
import Dashboard from './dashboard.handlers';
import middleware from '../../middleware';
import { Role } from '@prisma/client';
const { deserialize, authorizeRoles, userAgent } = middleware;

const Roles = authorizeRoles(Role.BASIC);

const router = express.Router();

router.get<{}, {}>('/', deserialize, Dashboard.getData);
router.get<{}, {}>('/charts', deserialize, Dashboard.getCharts);
router.get<{}, {}>('/nowtemp', deserialize, Dashboard.getNowTempHum);
router.get<{}, {}>('/temp', deserialize, Dashboard.getTempHum);
router.post<{}, {}>('/led', deserialize, Dashboard.ledControl);

export default router;
