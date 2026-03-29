import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import connectDb from './libs/db.js';
dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();

//  middleware
app.use(express.json());
app.use(cookieParser())


// database connection
connectDb()

// routes middleware

app.use('/api/auth',authRouter)
connectDb()


app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`);
})  