import { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState(""); 
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; 
    await sendMessages(message);
    setMessage(""); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2 h-[8vh] bg-gray-800 items-center px-4">
        <input
          type="text"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)} 
          className="rounded-xl border border-gray-700 outline-none px-4 py-3 w-full bg-gray-900 text-white"
        />

        <button type="submit" disabled={loading}>
          <IoSend className="text-3xl text-white hover:text-blue-400 transition" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
