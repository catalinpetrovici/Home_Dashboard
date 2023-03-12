import express from 'express';
import Device from './device.handlers';
import Topic from './topics.handlers';
import middleware from '../../middleware';
import { Role } from '@prisma/client';
const { deserialize, authorizeRoles, userAgent } = middleware;

const Roles = authorizeRoles(Role.BASIC);

const router = express.Router();

router.get<{}, {}>('/', deserialize, Device.getAll);
router.post<{}, {}>('/', deserialize, Device.add);
router.patch<{}, {}>('/:deviceId', deserialize, Device.update);
router.delete<{}, {}>('/:deviceId', deserialize, Device.remove);

router.get<{}, {}>('/:deviceId', deserialize, Topic.getAll);
router.post<{}, {}>('/:deviceId/', deserialize, Topic.add);
router.patch<{}, {}>('/:deviceId/:topicId', deserialize, Topic.update);
router.delete<{}, {}>('/:deviceId/:topicId', deserialize, Topic.remove);
router.post<{}, {}>('/:deviceId/:topicId/refresh', deserialize, Topic.refresh);

export default router;
