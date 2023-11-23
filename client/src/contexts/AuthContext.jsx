import React, { useContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/api";

const AuthContext = React.createContext(null);

export const useAuth = () => { return useContext(AuthContext) }

export const AuthProvider = ({ children }) => {

  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchCurrentUser();

      if (userData === null) {
        return;
      }

      setUser({ id: userData.login, email: userData.email, login: userData.login, events: userData.events });
    }

    fetchUserData();

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}