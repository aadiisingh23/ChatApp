import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import generateToken from '../libs/generateToken.js';
import cloudinary from '../libs/cloudinary.js';


export const registerUser = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;

        // validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const isUserExists = await User.findOne({ email })

        if (isUserExists) {
            return res.status(400).json({ message: "User already exists with this email" })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, 10);


        // craeting user
        const newUser = await User.create({
            fullName,
            password: hashedPassword,
            email
        })


        const token = generateToken(newUser._id, res)

        res.status(201).json({
            message: "User registered succesfully",
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            token
        })


    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Login Controller
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Check if user exists (explicitly select password if it's hidden in schema)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Compare passwords
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 4. Generate token
        const token = generateToken(user._id, res);

        // 5. Send response
        res.status(200).json({
            message: "Logged in successfully",
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({
                message: "Profile picture is required"
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        await updatedUser.save();


        res.status(200).json({
            message:"Profile picture updated succesfully",
            updatedUser
        })

    } catch (error) {
        console.log("Error in Update Profile controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req,res) => {
    try {
        res.status(200).json({
            message:"Authenticated",
            user: req.user
        })
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}