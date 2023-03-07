import express from 'express';
import Device from './device.handlers';
import middleware from '../../middleware';
import { Role } from '@prisma/client';
const { deserialize, authorizeRoles, userAgent } = middleware;

const Roles = authorizeRoles(Role.BASIC);

const router = express.Router();

router.get<{}, {}>('/', deserialize, Device.getAll);
router.post<{}, {}>('/', deserialize, Device.add);
router.patch<{}, {}>('/:deviceName', deserialize, Device.update);
router.delete<{}, {}>('/:deviceName', deserialize, Device.remove);

export default router;
