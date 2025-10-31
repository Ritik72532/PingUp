import useConversation from "../../zustand/useConversation"


function Chatuser() {
        const {selectedConversation} = useConversation();
        console.log(selectedConversation);
        
    return (
        <div  className='flex space-x-3 items-center justify-center h-[8vh] bg-gray-700 hover:bg-gray-800 duration-300'>
            <div className="avatar avatar-online">
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                </div>
            </div>
            <div>
                <h1>{selectedConversation.fullName}</h1>
                <span>Offline</span>
            </div>
        </div>
    )
}

export default Chatuser