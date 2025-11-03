import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "./SocketContext"
import sound from "../assets/notification'.wav"
const useGetSocketMessage = () => {
    const {socket} = useSocketContext();
    const {messages,setMessages}= useConversation();

    useEffect(()=>{
        if (!socket) return;
          const audio = new Audio(sound);
    const handleNewMessage = (newMessage) => {
        // sound
        audio.play();
      //  Append new message to existing messages
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
 
},[socket,setMessages]);
};
export default useGetSocketMessage
