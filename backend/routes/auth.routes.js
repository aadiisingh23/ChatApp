import express from 'express';
import { checkAuth, loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/signup',registerUser)
authRouter.post('/login',loginUser)
authRouter.get('/logout',logoutUser)
authRouter.put('/profile-update',authMiddleware,updateUserProfile)
authRouter.get('/check',authMiddleware,checkAuth)




export default authRouter;