import { useState, useEffect, useCallback } from "react";
import { useToken } from "./useToken";

export const useUser = (props) => {
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
      setUser(getPayloadFromToken(token));
    }
  }, [token, getPayloadFromToken]);

  // If caller of this hook passes a function in props.stateHandler,
  // we call that function here. This is used to set state in a parent/child
  // component.
  if (props && props.stateHandler) {
    props.stateHandler(user);
  }
  return user;
};
