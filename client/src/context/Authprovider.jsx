import  { createContext, useContext, useState } from 'react';
// import Cookies from "js-cookie";
export const Authcontext = createContext()
export const AuthProvider= ({children})=> {
//   console.log("Cookie:", Cookies.get("jwt"));
// console.log("LocalStorage:", localStorage.getItem("Pingup"));

    const initialUserState =  localStorage.getItem("Pingup");
   
    
    // parse the data and store in state
    const [authUser,setAuthUser] = useState(initialUserState?JSON.parse(initialUserState) : undefined);
  return (
   <Authcontext.Provider value={[authUser,setAuthUser]}>
    {children}
   </Authcontext.Provider>
  )
}

export const useAuth = ()=> useContext(Authcontext);