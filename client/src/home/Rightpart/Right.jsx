import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import { useAuth } from "../../context/Authprovider";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-[70%] text-gray-300 bg-slate-900 flex flex-col h-screen">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div
            className="flex-1 overflow-y-auto px-4 py-2"
            style={{ maxHeight: "calc(92vh - 8vh)" }}
          >
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;


const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
     
      <div className="text-6xl mb-4 animate-bounce">💬</div>

     
      <h1 className="text-2xl font-semibold text-white">
        Welcome,{" "}
        <span className="text-orange-400">{authUser?.fullName || "User"}</span> 👋
      </h1>

     
      <p className="mt-3 text-gray-400 text-lg max-w-md">
        No chat selected yet. Start a conversation to connect with someone!
      </p>

     
      <button className="mt-6 px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition">
        Start Chatting
      </button>
    </div>
  );
};
