import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const onSubmitClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`);
      // TODO: Error handling
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  return success ? (
    <div className="content-container">
      <h1>Success</h1>
      <p>Check your email for a reset link</p>
    </div>
  ) : (
    <div className="content-container">
      <h1>Forgot Password</h1>
      <p>Enter your email and we will send you a reset link</p>
      {errorMsg && <div className="fail">{errorMsg}</div>}
      <input
        value={emailValue}
        onChange={(e) => {
          setEmailValue(e.target.value);
        }}
        placeholder="someone@domain.com"
      />
      <button disabled={!emailValue} onClick={onSubmitClicked}>
        Submit
      </button>
    </div>
  );
};
