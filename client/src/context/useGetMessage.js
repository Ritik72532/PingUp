import  { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation.js'
import axios from "axios"
const useGetMessage =()=> {
    const [loading,setLoading] = useState(false)
    const {messages,setMessages,selectedConversation} = useConversation();
    //console.log(messages);
    
    useEffect(()=>{
        const getMessages = async()=>{
            setLoading(true)
          //  console.log("Selected conversation:", selectedConversation);

           if(selectedConversation && selectedConversation._id){
             try {
                const response = await axios.get(`/api/message/get/${selectedConversation._id}`)
              //  console.log(response.data);
                
                setMessages(response.data);
                setLoading(false)
            } catch (error) {
                console.log("Error in useGetMessage file ",error);
                setLoading(false)
            }
           }
        }
        getMessages()
    },[selectedConversation,setMessages])
  return {loading,messages}
}

export default useGetMessage