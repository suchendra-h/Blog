import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import getUserFromToken from "../util/getUserFromToken";

export const UserInfoPage = (props) => {
  const user = props.user;
  //   console.log("in user info page", user);
  const [token, setToken] = useToken();
  // These states are bound to the values of the text inputs
  // on the page (see JSX below).
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  // Programmatically redirect to login page if user not logged in.
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setName(user.info.name);
      setLastName(user.info.lastName);
      setBio(user.info.bio);
    }
  }, [user, navigate]);

  // TODO: Find why react gives an error even if we are going to redirect to login in above useEffect hook.
  const { id, email, isVerified, info } = user ? user : {};

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `/api/users/${id}`,
        {
          name,
          lastName,
          bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { token: newToken } = response.data;
      setToken(newToken);
      props.setUser(getUserFromToken(newToken));
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const resetValues = () => {
    setName(info.name);
    setLastName(info.lastName);
    setBio(info.bio);
  };

  // And here we have the JSX for our component.
  return (
    <div className="content-container">
      <h1>Info for {email}</h1>
      {/* {!isVerified && (
        <div className="fail">
          You won't be able to make any changes until you verify your email
        </div>
      )} */}
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Name {name && isVerified} :
        <input onChange={(e) => setName(e.target.value)} value={name} />
      </label>
      <label>
        Last Name:
        <input onChange={(e) => setLastName(e.target.value)} value={lastName} />
      </label>
      <label>
        Bio:
        <input onChange={(e) => setBio(e.target.value)} value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
