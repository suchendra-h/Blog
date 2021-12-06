import React, { useEffect, useState } from "react";
import { useUser } from "../auth/useUser";

const userConntextObject = {
  user: null, // a user object returned from useUser hook
  updateUser: () => {}, // a template function to update the user from children
};

export const UserContext = React.createContext(userConntextObject);

export default function UserProviderComponent({ children }) {
  const initUser = useUser();

  // sets the initial state to include the update user function
  const [userState, setUserState] = useState(initUser);
  const value = {
    user: userState,
    updateUser: setUserState,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
