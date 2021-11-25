import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";

// Parses the token to extract payload
const getUserFromToken = (token) => {
  if (!token) {
    return null;
  } else {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(Buffer.from(encodedPayload, "base64"));
  }
};

export const useToken = () => {
  const context = useContext(UserContext);
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("token");
  });

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    context.updateUser(getUserFromToken(newToken));
    setTokenInternal(newToken);
  };
  return [token, setToken];
};
