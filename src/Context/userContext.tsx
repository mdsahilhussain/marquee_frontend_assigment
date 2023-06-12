/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useState } from "react";
import { iUser, iUserContextProps } from "../interface/Types";

const UserContext = createContext<iUserContextProps>({
  user: null,
  logoutHandler: () => {},
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<iUser | null>(null);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logoutHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = (): iUserContextProps => useContext(UserContext);
