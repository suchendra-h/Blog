////////////////////////////////////////////////
// MEMORY LEAKKKKKKKK

import { Navigate, useParams } from "react-router-dom";
import { UserInfoPage } from "../pages/UserInfoPage";
import { useUser } from "./useUser";
export const PrivateRoute = () => {
  // TODO: maka this component general so that it will navigate to a address  in the .params

  const user = useUser(); // authenticated user on local machine
  const urlUserName = useParams().username; // username (email) from url
  if (!user) {
    return <Navigate to="/login" />;
  } else if (!urlUserName) {
    return <Navigate to={`/users/${user.id}`} />;
  } else if (urlUserName) {
    return <UserInfoPage />;
  } else {
    return <Navigate to="/login" />;
  }
};
