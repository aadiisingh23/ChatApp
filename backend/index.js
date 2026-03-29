import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();

//  middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors())



// routes middleware

app.use('/appi/auth',authRouter)



app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`);
})  