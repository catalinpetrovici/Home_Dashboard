import express from 'express';
import Dashboard from './dashboard.handlers';
import middleware from '../../middleware';
import { Role } from '@prisma/client';
const { authorize: Auth, authorizeRoles, userAgent } = middleware;

const Roles = authorizeRoles(Role.BASIC);

const router = express.Router();

router.get<{}, {}>('/', Auth, Roles, userAgent, Dashboard.getData);
router.get<{}, {}>('/charts', Auth, Roles, userAgent, Dashboard.getCharts);
router.get<{}, {}>('/nowtemp', Auth, Roles, userAgent, Dashboard.getNowTempHum);
router.get<{}, {}>('/temp', Auth, Roles, userAgent, Dashboard.getTempHum);
router.post<{}, {}>('/led', Auth, Roles, userAgent, Dashboard.ledControl);

export default router;
