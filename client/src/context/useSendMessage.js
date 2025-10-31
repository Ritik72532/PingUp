import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useSendMessage = () => {
    const [loading,setLoading] = useState(false)
    const {messages,setMessages,selectedConversation} = useConversation();
     const sendMessages = async(message)=>{
            setLoading(true)
          
             try {
                const response = await axios.get(`/api/message/send/${selectedConversation._id}`)  // ,{message}
                setMessages([...messages,response.data]);
                setLoading(false)
            } catch (error) {
                console.log("Error in useSendMessage file ",error);
                setLoading(false)
            }
           
        }
  return {loading,sendMessages}
}

export default useSendMessage
