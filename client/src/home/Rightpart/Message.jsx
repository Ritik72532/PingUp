function Message({ message }) {
  // Get logged in user safely
  const storedUser = sessionStorage.getItem("Pingup");
  const authUser = storedUser ? JSON.parse(storedUser) : null;

  // If authUser not ready, just render message neutrally
  if (!authUser || !message) {
    return (
      <div className="p-4">
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-600 text-white">
            {message?.message || "Loading..."}
          </div>
        </div>
      </div>
    );
  }

  // Determine who sent it
  const itsMe = message.senderId === authUser._id;
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-600";

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
        </div>
      </div>
    </div>
  );
}

export default Message;
