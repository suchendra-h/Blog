import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../static/css/UserLoginPage.css";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams.js";

export const UserLoginPage = () => {
  const [, setToken] = useToken("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [errorTxt, setErrorTxt] = useState("");
  const [googleOauthUrl, setGoogleOauthURL] = useState("");

  const navigate = useNavigate();
  const { token: oauthToken } = useQueryParams();

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate("/user");
    }
  }, [oauthToken, setToken, navigate]);
  // GETs the google OAUTH url from the backend and sets the state
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
        <button>Forgot your pasword?</button>
        <button>Don't have an account? Sign Up</button>
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
