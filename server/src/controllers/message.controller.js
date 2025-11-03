import { getReceiverSocketId, io } from "../../SocketIO/server.js"
import Conversation from "../models/conversation.models.js"
import Message from "../models/message.models.js"

export const sendMessage = async(req,res)=>{
  //  console.log("message sent");
  try {
    const {message} = req.body 
    const {id:receiverId} = req.params
    const senderId = req.user._id
    let conversation = await Conversation.findOne({
        members:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        conversation =await Conversation.create({
              members:[senderId,receiverId]
        }) 
    }
    const newMessage = new Message({
        message,
        senderId,
        receiverId
    })
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save()
    await Promise.all([conversation.save(),newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverId).emit("newMessage",newMessage) ;
    };
    res.status(201).json(
       
        newMessage
    )
  } catch (error) {
    console.log("Error in sendMessage",error);
   res.status(500).json({message:"Internal serval error"})
  }
}

export const getMessage = async(req,res)=>{
try {
  const {id: receiverId} = req.params;
  const senderId = req.user._id 
  let conversation =await  Conversation.findOne({
     members:{$all:[senderId,receiverId]}
  }).populate("messages");
  if(!conversation){
    return res.status(200).json([])
  }
  const messages = conversation.messages
  res.status(200).json(messages);
} catch (error) {
   console.log("Error in getMessage",error);
   res.status(500).json({message:"Internal serval error"})
}
}