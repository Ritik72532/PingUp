import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./Authprovider";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:4001", {
        query: { userId: authUser._id },
        withCredentials: true,
      });

      // Listen for users
      newSocket.on("getOnlineUsers", (users) => {
        console.log("Online users:", users);
        setOnlineUsers(users);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [authUser]); // don't add socket here or it’ll cause multiple rebinds

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
