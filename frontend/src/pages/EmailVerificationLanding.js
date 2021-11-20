import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import axios from "axios";
import { useToken } from "../auth/useToken.js";

export const EmailVerificationLandig = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { verificationString } = useParams();
  const [, setToken] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ verificationString });
    const loadVerification = async () => {
      try {
        const response = await axios.put("/api/verify-email", {
          verificationString,
        });
        console.log(response);
        const { token } = response.data;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    };
    loadVerification();
  }, [setToken, verificationString]);

  if (isLoading) return <p>Loading...</p>;
  if (isSuccess)
    return (
      <div className="content-container">
        {" "}
        <p> Account accivated succesfully!</p>{" "}
        <button
          onClick={() => {
            navigate("/user");
          }}
        >
          Edit your profile
        </button>
      </div>
    );
  else return <p>Verificaton failed</p>;
};
