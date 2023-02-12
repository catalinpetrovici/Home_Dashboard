import express from 'express';
import middleware from '../../middleware';
import AuthHandlers from './auth.handlers';

const router = express.Router();
const { authorize: Auth } = middleware;

router.post('/register', AuthHandlers.register);
router.post('/login', AuthHandlers.login);
router.post('/logout', Auth, AuthHandlers.logout);
router.post('/verify-email', AuthHandlers.verifyEmail);
router.post('/reset-password', AuthHandlers.resetPassword);
router.post('/forgot-password', AuthHandlers.forgotPassword);

export default router;
