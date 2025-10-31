

function Message({message}) {
  const authUser = JSON.parse(localStorage.getItem("Pingup"));
  // console.log(message.senderId);
  // console.log(authUser._id);
  const itsMe = message.senderId === authUser._id;
  const chatName = itsMe?"chat-end":"chat-start";
  const chatColor = itsMe?"bg-blue-500":""
  return (
    <div>
        <div className='p-4' >
                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
                </div>
                
            </div>
    </div>
  )
}

export default Message