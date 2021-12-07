import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";

// Parses the token to extract payload
export const getUserFromToken = (token) => {
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
    const token = localStorage.getItem("token");
    return token;
  });

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.setItem("token", "");
    }
    context.updateUser(getUserFromToken(newToken));
    setTokenInternal(newToken);
  };
  return [token, setToken];
};
