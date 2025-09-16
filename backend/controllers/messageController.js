import mongoose from "mongoose";
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let gotConversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        

        await Promise.all([gotConversation.save(), newMessage.save()]);
         
        // SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}
export const getMessage = async (req,res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages"); 

        if (conversation) {
            // Mark messages as read where the current user is the receiver
            await Message.updateMany(
                { _id: { $in: conversation.messages }, receiverId: senderId, read: false },
                { $set: { read: true } }
            );
        }

        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
};

export const getUnreadMessages = async (req, res) => {
    try {
        const userId = req.id;
        const unreadMessages = await Message.aggregate([
            { $match: { receiverId: new mongoose.Types.ObjectId(userId), read: false } },
            { $group: { _id: "$senderId", count: { $sum: 1 } } }
        ]);

        const unreadCounts = unreadMessages.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});

        return res.status(200).json(unreadCounts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
