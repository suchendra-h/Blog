import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../static/css/UserLoginPage.css";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams.js";
import { getUserFromToken } from "../auth/useToken.js";
import { UserContext } from "../contexts/UserContextProvider";
import validator from "validator";

export const UserLoginPage = () => {
  const context = useContext(UserContext);
  const [token, setToken] = useToken("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorTxt, setErrorTxt] = useState("");
  const [googleOauthUrl, setGoogleOauthURL] = useState("");

  const navigate = useNavigate();
  const { token: oauthToken } = useQueryParams();

  useEffect(() => {
    setTimeout(() => {
      setErrorTxt("");
    }, 1500);
  }, [errorTxt]);

  // When token changes, sets the parent components user state.
  // From the new token
  useEffect(() => {
    context.updateUser(getUserFromToken(token));
  }, [token, context]);

  //   if there is an update in oauthToken sets the token to the new oauthToken
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      context.updateUser(getUserFromToken(oauthToken));
      navigate("/user");
    }
  }, [oauthToken, context, setToken, navigate]);

  // GETs the google OAUTH url from the backend and sets the state.
  // Runs only once
  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthURL(url);
      } catch (error) {
        setGoogleOauthURL("");
        console.log(error);
      }
    };
    load();
  }, []);

  // Loging button click handler, token is null if query fails
  const onLoginClicked = async () => {
    const response = await axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      // handle response
      .then(function (response) {
        console.log(response);
        const { token } = response.data;
        setToken(token);
        navigate("/user");
      })
      // handle failure
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            setErrorTxt("Invalid username or password");
          }
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setErrorTxt("No response received from server");
          //   console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorTxt("Oops, some error happened!");
          //   console.log("Error", error.message);
        }
        // console.log(error.config);
      });
  };
  return (
    <div className="page-container">
      <div className="content-container ">
        <h1>Log in</h1>
        {errorTxt ? <p className="fail">{errorTxt}</p> : <p></p>}
        <input
          type="username"
          placeholder="someone@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={(e) => {
            if (!validator.isEmail(e.target.value)) {
              setErrorTxt("Please enter a valid email");
            }
          }}
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
