"use strict";

import { getDbConnection } from "../db.js";
import jwt from "jsonwebtoken";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool.js";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResul) => {
        if (err) {
          //   console.log(err);
          return res.status(500).json({ message: "Unable to signup on aws" });
        }
        const db = getDbConnection("react-auth-db");
        const startingInfo = {
          name: "",
          lastName: "",
          bio: "",
        };
        const result = await db
          .collection("users")
          .insertOne({ email, info: startingInfo });
        const { insertedId } = result;

        jwt.sign(
          {
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2w",
          },
          (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
          }
        );
      }
    );
  },
};
