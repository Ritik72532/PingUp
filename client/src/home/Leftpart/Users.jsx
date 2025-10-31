
import User from './User'
import useGetAllUsers from '../../context/useGetAllUsers'

function Users() {
    const {allUsers,loading} = useGetAllUsers();
    console.log(allUsers);
    
    return (
        <div>
            <h1 className='px-6 py-2 text-white font-semibold bg-slate-800'>Messages</h1>
            <div className='py-2 body my-2 overflow-y-auto' style={{maxHeight: "calc(84vh - 10vh)"}}>
                {allUsers.map((user,index) => (
                    <User key={index} user = {user} />
                ))}
            </div>
        </div>
    )
}

export default Users