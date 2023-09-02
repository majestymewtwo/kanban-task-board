import { createContext, useState } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [islogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider
      value={{ isLoggedIn: islogged, setLoggedIn: setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
};
