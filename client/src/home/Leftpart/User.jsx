import { useSocketContext } from '../../context/SocketContext.jsx';
import useConversation from '../../zustand/useConversation.js';

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`cursor-pointer transition-colors duration-200 
        ${isSelected ? "bg-slate-700" : "hover:bg-slate-800"} 
        text-white`}
    >
      <div className="flex items-center space-x-4 px-4 py-3 relative">
        {/* Avatar Wrapper */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-700">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt={user.fullName}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Green Dot (Online Indicator) */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          )}
        </div>

        {/* User Info */}
        <div>
          <h1 className="font-bold text-lg">{user.fullName}</h1>
          <span className="text-sm text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
