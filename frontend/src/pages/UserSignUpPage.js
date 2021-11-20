import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../static/css/UserLoginPage.css";
import { UserLoginPage } from "./UserLoginPage";
import { useToken } from "../auth/useToken";
import axios from "axios";

export const UserSignUpPage = () => {
  const [token, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorTxt, setErrorTxt] = useState("");

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    const response = await axios.post("/api/signup", {
      email: email,
      password: password,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/");
  };
  return (
    <div className="page-container">
      <div className="content-container ">
        <h1>Sign Up</h1>
        <label>Email</label>
        <input
          type="username"
          placeholder="someone@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <label> </label>
        <button
          disabled={!email || !password || password !== confirmPassword}
          onClick={onSignUpClicked}
        >
          Sing Up
        </button>
        <button>Forgot your pasword?</button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an accoune? Login
        </button>
      </div>
    </div>
  );
};

export default UserSignUpPage;
