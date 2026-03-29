import cloudinary from "../libs/cloudinary.js";
import messageModel from "../models/message.model.js";
import User from "../models/user.model.js"

export const getUsers = async (req, res) => {
    try {

        const filteredData = await User.find({
            _id: {
                $ne: req.user._id
            }
        }).select('-password')

        res.status(200).json(filteredData)
    } catch (error) {
        console.log("Error in Get User Controller", error.message);
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.body._id;

        const messages = await messageModel.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        if (!messages) {
            return res.status(404).json({ message: "No messages found" })
        }

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in Get Messages Controller", error.message);
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        
        await newMessage.save();

        //  now i am going to add socket io functionality here to emit new message to receiver in real time

        res.status(201).json(newMessage)

        
    } catch (error) {
        console.log("Error in send message Controller", error.message);
        res.status(500).json({ message: "Internal server Error" })
    }
}