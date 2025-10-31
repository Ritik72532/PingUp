import mongoose from "mongoose"
import Message from "./message.models.js"
import User from "./user.models.js"
const conversationSchema = new mongoose.Schema({
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
        }],
    messages:[{
          type: mongoose.Schema.Types.ObjectId,
        ref: Message
    }]
},{timestamps:true});
const Conversation = mongoose.model("Conversation",conversationSchema)
export default Conversation