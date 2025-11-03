import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js"
function Chatuser() {
        const {selectedConversation} = useConversation();
      //  console.log(selectedConversation);
        const {onlineUsers} = useSocketContext();
        const getOnlineUsersStatus = (userId) =>{
            return onlineUsers.includes(userId)?"Online":"Offline"
        }
    return (
        <div  className='flex space-x-3 items-center justify-center h-[8vh] bg-gray-700 hover:bg-gray-800 duration-300'>
            <div className={`avatar `} >
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                </div>
            </div>
            <div>
                <h1>{selectedConversation.fullName}</h1>
                <span>{getOnlineUsersStatus(selectedConversation._id)}</span>
            </div>
        </div>
    )
}

export default Chatuser