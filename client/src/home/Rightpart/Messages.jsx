import useGetSocketMessage from '../../context/useGetSocketMessage.js';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from "../../components/Loading.jsx";
import Message from './Message.jsx';
import { useEffect, useRef } from 'react';

function Messages() {
    const {loading,messages} = useGetMessage();
    // listeninig incoming messages 
    useGetSocketMessage();
    console.log(messages);
    const lastMsgRef = useRef();
    useEffect(()=>{
        setTimeout(()=>{
            if(lastMsgRef.current){
                lastMsgRef.current.scrollIntoView({behaviour: "smooth"});
            }
        },100);
    },[messages]);
    
    return (
        <div className='body overflow-y-auto' style={{minHeight: "calc(92vh - 8vh )"}}>
            {loading ?(<Loading/>):(messages.length>0 && messages.map((message)=>(
                <div key ={message._id} ref={lastMsgRef}>
                      <Message  message={message} />
                </div>
              
            )
            ))}
           { !loading && messages.length ===0 && (
            <div>
                <p className='text-center mt-[20%]'> Say! Hi to start the conversation </p>
            </div>
           )}
              
        </div>
    )
}

export default Messages