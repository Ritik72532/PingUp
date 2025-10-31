import useConversation from '../../zustand/useConversation.js';

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`cursor-pointer transition-colors duration-200 
        ${isSelected ? "bg-slate-700" : "hover:bg-slate-800"} 
        text-white`}
    >
      <div className="flex items-center space-x-4 px-4 py-3">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt={user.fullName}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">{user.fullName}</h1>
          <span className="text-sm text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
