import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';



export const registerUser = async (req,res) => {
    try {

        const {fullName,email,password} =req.body;

        // validation
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const isUserExists  = await User.findOne({email})
        
        if(isUserExists){
            return res.status(400).json({message:"User already exists with this email"})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,10);


        // craeting user
        const newUser = await User.create({
            fullName,
            password:hashedPassword,
            email
        })

        


    } catch (error) {
        console.log("Error in register controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}