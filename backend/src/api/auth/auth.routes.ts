import express from 'express';
import middleware from '../../middleware';
import AuthHandlers from './auth.handlers';

const router = express.Router();
const { deserialize, userAgent } = middleware;

router.post('/register', AuthHandlers.register);
router.post('/login', userAgent, AuthHandlers.login);
router.post('/logout', deserialize, userAgent, AuthHandlers.logout);
router.post('/verify-email', userAgent, AuthHandlers.verifyEmail);
router.post('/reset-password', userAgent, AuthHandlers.resetPassword);
router.post('/forgot-password', userAgent, AuthHandlers.forgotPassword);

export default router;
