import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { CurrentUser } = useContext(AuthContext);
    const [Socket, setSocket] = useState(null);

    useEffect(() => {
        // Update to use the same port as the backend
        setSocket(io("https://propertypal-wbh0.onrender.com", {
            withCredentials: true
        }));
    }, []);

    useEffect(() => {
        CurrentUser && Socket?.emit("newUser", CurrentUser.id);
    }, [CurrentUser, Socket]);

    return (
        <SocketContext.Provider value={{ Socket }}>
            {children}
        </SocketContext.Provider>
    );
};
