import { useState } from "react";
import axios from "axios";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";
import { useQueryParams } from "../util/useQueryParams";

export const AwsPasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const { email } = useQueryParams();

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        email: email,
        newPassword: passwordValue,
      });
      // TODO: Error handling
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };

  if (isSuccess) return <PasswordResetSuccess />;
  if (isFailure) return <PasswordResetFail />;

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        type="password"
        name="password"
        autoComplete="new-password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        autoComplete="new-password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="Confirm Password"
      />
      <input
        value={passwordResetCode}
        autoComplete="one-time-code"
        onChange={(e) => setPasswordResetCode(e.target.value)}
        placeholder="Reset Code"
      />
      <button
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onResetClicked}
      >
        Reset Password
      </button>
    </div>
  );
};
