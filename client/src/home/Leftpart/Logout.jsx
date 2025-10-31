import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie"
function Logout() {
   const [loading,setLoading] = useState(false);
  const handleLogout = async()=>{
    try {
      setLoading(true);
    const res =  await axios.post("api/user/logout");
    localStorage.removeItem("Pingup");
    Cookies.remove("jwt");
      setLoading(false);
      alert("Logout successfully");
      window.location.reload()
    } catch (error) {
      console.log("Error occur during Logout in frontend " + error);
      
    }
  }
  return (
    <div className='h-[10vh]'>
       <div className="">
        <BiLogOutCircle className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1" onClick={handleLogout} />
       </div>
      </div>
  )
}

export default Logout

