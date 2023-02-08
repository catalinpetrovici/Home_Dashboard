import express from 'express';
const router = express.Router();

import AuthHandlers from './auth.handlers';

router.post('/register', AuthHandlers.register);
router.post('/login', AuthHandlers.login);
router.delete('/logout', AuthHandlers.logout);
router.post('/verify-email', AuthHandlers.verifyEmail);
router.post('/reset-password', AuthHandlers.resetPassword);
router.post('/forgot-password', AuthHandlers.forgotPassword);

export default router;
