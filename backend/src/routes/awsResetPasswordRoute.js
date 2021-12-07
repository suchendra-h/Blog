import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool.js";

export const awsResetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;
    const { email, newPassword } = req.body;
    const awsCognitoUser = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });

    const callbacks = {
      onSuccess: () => {
        // console.log(`Password successfully changed for user ${email}`);
        res.sendStatus(200);
      },
      onFailure: (err) => {
        // console.log(`Error happened in pass reset for user ${email} :\n`, err);
        res.status(401).send(err);
      },
    };
    awsCognitoUser.confirmPassword(passwordResetCode, newPassword, callbacks);
  },
};
