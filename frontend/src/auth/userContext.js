import React, { useState, createContext } from "react";
import { useUser } from "./useUser";

export const UserContext = createContext(null);
export const UserProvider = (props) => {
  const [user, setUser] = useState(useUser);
  return (
    <UserContext.Provider value={"hello"}>
      {props.children}
    </UserContext.Provider>
  );
};
