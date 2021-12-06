import { useState, useEffect, useCallback, useContext } from "react";
import { useToken } from "./useToken";
import { UserContext } from "../contexts/UserContextProvider";

export const useUser = (props) => {
  const context = useContext(UserContext);

  const [token] = useToken();

  //   getPayloadFromToken is a memoized function.
  //   It only runs if token has been changed.
  const getPayloadFromToken = useCallback(() => {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(Buffer.from(encodedPayload, "base64"));
  }, [token]);

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  // returned variable is a state of this component.
  // If token changes, user will also change

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      let local_user = getPayloadFromToken(token);
      setUser(local_user);
      context.updateUser(local_user);
    }
  }, [token, context, getPayloadFromToken]);

  return user;
};
