import express from 'express';
import Dashboard from './dashboard.handlers';
import middleware from '../../middleware';
import { Role } from '@prisma/client';
const { deserialize, authorizeRoles, userAgent } = middleware;

const Roles = authorizeRoles(Role.BASIC);

const router = express.Router();

router.get<{}, {}>('/charts', deserialize, Dashboard.getCharts);
router.get<{}, {}>('/now', deserialize, Dashboard.getNowTempHum);

export default router;
