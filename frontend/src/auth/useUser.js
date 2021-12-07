import { useState, useEffect, useContext } from "react";
import { useToken, getUserFromToken } from "./useToken";
import { UserContext } from "../contexts/UserContextProvider";

export const useUser = () => {
  const context = useContext(UserContext);
  const [token] = useToken();

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getUserFromToken(token);
  });

  // returned variable is a state of this component.
  // If token changes, user will also change

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      let local_user = getUserFromToken(token);
      setUser(local_user);
      context.updateUser(local_user);
    }
  }, [token, context]);

  return user;
};
