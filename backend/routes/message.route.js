import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { getMessages, getUsers, sendMessages } from '../controllers/message.controller.js';

const messageRouter = express.Router();

messageRouter.get('/users',authMiddleware,getUsers)
messageRouter.get('/:id',authMiddleware,getMessages)
messageRouter.post('/:id',authMiddleware,sendMessages)

export default messageRouter;