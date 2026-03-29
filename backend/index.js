import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDb from './libs/db.js';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.route.js';
dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();

//  middleware
app.use(express.json());
app.use(cookieParser())


// database connection
connectDb()

// routes middleware

app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)



app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
})  