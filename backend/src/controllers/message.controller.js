import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js";

//Get Users for sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserID = req.user.id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserID } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getting users for sidebar", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Get messages
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(message);
    } catch (error) {
        console.log("Error in message Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Send Message
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //Upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        //Realtime functionality using socket io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in Sendmessage Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
};