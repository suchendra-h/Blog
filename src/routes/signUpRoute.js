"use strict";

import { getDbConnection } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    // await initializeDbConnection();
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });
    if (user) {
      res.sendStatus(409);
      return;
    }
    const passHash = await bcrypt.hash(password, 10);
    const startInfo = {
      hairColor: "",
      favFood: "",
      bio: "",
    };
    const result = await db.collection("users").insertOne({
      email,
      passHash,
      info: startInfo,
      isVerified: false,
    });
    const { insertedID } = result;
    jwt.sign(
      {
        id: insertedID,
        email: email,
        info: startInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2w",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          return res.status(200).json({ token });
        }
      }
    );
  },
};
