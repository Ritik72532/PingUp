
import Right from './home/Rightpart/Right';
import Left from './home/Leftpart/Left';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/Authprovider';
import {  Routes, Route, Navigate } from "react-router-dom";
import Loading from './components/Loading';
function App ()  {
  const [authUser,setAuthUser] = useAuth();
console.log(authUser);
  
  return (
  <Routes>
    <Route path="/" element={
      authUser? <div className='flex h-screen'>
   <Left/>
   <Right/>
   </div> : <Navigate to = "/login" />
    } />
    <Route path='/login' element={authUser?<Navigate to="/"/>: <Login/>}/>
    <Route path='/signup' element={authUser?<Navigate to="/"/>: <Signup/>}/>
  </Routes>
  // <Loading/>
  )
}

export default App


