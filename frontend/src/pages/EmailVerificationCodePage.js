import { useState } from "react";
import axios from "axios";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess.js";
import { EmailVerificationFail } from "./EmailVerificationFail.js";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams.js";

export const EmailVerificationCodePage = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const [verificationString, setVerificationString] = useState("");
  const { email } = useQueryParams();
  const [, setToken] = useToken();

  const onSubmitVerificationString = async () => {
    try {
      const response = await axios.put("/api/verify-email", {
        email,
        verificationString,
      });
      const { token } = response.data;
      setToken(token);
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };
  if (isSuccess) return <EmailVerificationSuccess />;
  if (isFailure) return <EmailVerificationFail />;

  return (
    <div className="content-container">
      <h1>Please verify your email</h1>
      <p>
        You should have received a 6 digit verification string please enter it
        here:
      </p>
      <input
        placeholder="e.g. 123456"
        value={verificationString}
        onChange={(e) => setVerificationString(e.target.value)}
      />
      <button onClick={onSubmitVerificationString}>Submit</button>
    </div>
  );
};
