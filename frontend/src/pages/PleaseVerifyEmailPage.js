import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "../util/useQueryParams";

export const PleaseVerifyEmailPage = () => {
  const navigate = useNavigate();
  const { email } = useQueryParams();
  useEffect(() => {
    setTimeout(() => {
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    }, 3000);
  }, [navigate, email]);

  return (
    <div className="content-container">
      <h1>Thanks for Signing Up!</h1>
      <p>
        A verification email has been sent to the email address you provided.
        Please verify your email to unlock full site features.
      </p>
    </div>
  );
};
