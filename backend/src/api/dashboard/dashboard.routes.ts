import express from 'express';
import Dashboard from './dashboard.handlers';
import middleware from '../../middleware';
import { Role } from '@prisma/client';
const { deserialize, authorizeRoles, userAgent } = middleware;

const Roles = authorizeRoles(Role.BASIC);

const router = express.Router();

router.get<{}, {}>('/devices', deserialize, Dashboard.getData);
router.get<{}, {}>('/devices/data/:deviceId');
router.post<{}, {}>(
  '/devices/control/:deviceId',
  deserialize,
  Dashboard.ledControl
);

router.get<{}, {}>('/charts/:type', deserialize, Dashboard.getCharts);
router.get<{}, {}>('/now/:type', deserialize, Dashboard.getNowTempHum);

export default router;
