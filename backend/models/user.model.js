import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Full name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Prevents duplicate registrations
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePic: {
        type: String,
        default: "" // Can store a URL or Base64 string
    }
}, {
    timestamps: true
});

//  creating MOdel

const User = mongoose.model("User", userSchema)

export default User;

