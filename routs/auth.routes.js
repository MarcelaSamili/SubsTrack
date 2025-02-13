import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

// /api/v1/auth/sing-up (POST)
authRouter.post('/sign-up', signUp);
// /api/v1/auth/sing-in (POST)
authRouter.post('/sign-in', signIn);
// /api/v1/auth/sing-out (POST)
authRouter.post('/sign-out', signOut);

export default authRouter;
