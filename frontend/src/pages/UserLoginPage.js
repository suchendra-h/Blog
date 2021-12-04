import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../static/css/UserLoginPage.css";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams.js";
import { useUser } from "../auth/useUser";
import getUserFromToken from "../util/getUserFromToken";

export const UserLoginPage = (props) => {
  const [token, setToken] = useToken("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [errorTxt, setErrorTxt] = useState("");
  const [googleOauthUrl, setGoogleOauthURL] = useState("");
  const navigate = useNavigate();
  const { token: oauthToken } = useQueryParams();

  // When token changes, sets the parent components user state.
  // From the new token
  useEffect(() => {
    props.setUser(getUserFromToken(token));
  }, [token, props, props.user]);

  //   if there is an update in oauthToken sets the token to the new oauthToken
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      let local_user = getUserFromToken(oauthToken);
      console.log(local_user);
      props.setUser(local_user);
      navigate("/user");
    }
  }, [oauthToken, setToken, navigate, props]);

  // GETs the google OAUTH url from the backend and sets the state.
  // Runs only once
  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthURL(url);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  // Loging button click handler, token is null if query fails
  const onLoginClicked = async () => {
    const response = await axios.post("/api/login", {
      email: email,
      password: password,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/user");
  };
  return (
    <div className="page-container">
      <div className="content-container ">
        <h1>Log in</h1>
        <input
          type="username"
          placeholder="someone@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button disabled={!email || !password} onClick={onLoginClicked}>
          Log in
        </button>
        <button
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Forgot your pasword?
        </button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Don't have an account? Sign Up
        </button>
        <hr></hr>

        <button
          disabled={!googleOauthUrl}
          onClick={() => {
            window.location.href = googleOauthUrl;
          }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default UserLoginPage;
