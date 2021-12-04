"use strict";

import jwt from "jsonwebtoken";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { getDbConnection } from "../db.js";
import { awsUserPool } from "../util/awsUserPool.js";

export const awsLoginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    // Seperate that user from the pool
    // TODO: error handling if the user does not exist
    const AwsCognitoUser = new CognitoUser({
      Username: email,
      Pool: awsUserPool,
    });
    // What is our username and password? They come in the request body
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    // Define what should be done in case of authentication success and failure
    const conf = {
      onSuccess: async (result) => {
        const db = getDbConnection("react-auth-db");
        const user = await db.collection("users").findOne({ email });

        const { _id: id, isVerified, info } = user;

        jwt.sign(
          { id, isVerified, email, info },
          process.env.JWT_SECRET,
          { expiresIn: "2d" },
          (err, token) => {
            if (err) {
              res.sendStatus(500);
            }

            res.status(200).json({ token });
          }
        );
      },
      onFailure: (err) => {
        res.sendStatus(401);
      },
    };

    // Finally do the authentication in Cognito
    AwsCognitoUser.authenticateUser(authDetails, conf);
  },
};
