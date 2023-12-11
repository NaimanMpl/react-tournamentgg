import React, { useContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/api";

const AuthContext = React.createContext(null);

export const useAuth = () => { return useContext(AuthContext) }

export const AuthProvider = ({ children }) => {

  const [ user, setUser ] = useState({ loggedIn: false, loading: true });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchCurrentUser();

      if (userData === null) {
        setUser({ loggedIn: false, loading: false });
        return;
      }

      setUser({ 
        id: userData.id,
        email: userData.email,
        login: userData.login,
        events: userData.events,
        profilePicture: userData.profilePicture,
        admin: userData.admin,
        loggedIn: true,
        loading: false
      });
    }

    fetchUserData();

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}