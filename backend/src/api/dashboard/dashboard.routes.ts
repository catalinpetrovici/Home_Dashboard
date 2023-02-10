import express from 'express';
import Dashboard from './dashboard.handlers';
import middleware from '../../middleware';
import { Role } from '@prisma/client';
const { authorize: Auth, authorizeRoles } = middleware;

const Roles = authorizeRoles(Role.BASIC);

const router = express.Router();

router.get<{}, {}>('/', Auth, Roles, Dashboard.getData);
router.get<{}, {}>('/charts', Auth, Roles, Dashboard.getCharts);
router.get<{}, {}>('/nowtemp', Auth, Roles, Dashboard.getNowTempHum);
router.get<{}, {}>('/temp', Auth, Roles, Dashboard.getTempHum);
router.post<{}, {}>('/led', Auth, Roles, Dashboard.ledControl);

export default router;
