"use strict";

import { getDbConnection } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });
    console.log(user);

    if (!user) return res.sendStatus(401); // user not found in DB

    const { _id: id, info, passHash, isVerified } = user;
    const isPassCorrect = await bcrypt.compare(password, passHash);

    // sign the data and send the token back to the user
    if (isPassCorrect) {
      jwt.sign(
        {
          id: id,
          email: email,
          info: info,
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
    } else {
      res.sendStatus(401);
    }
    return;
  },
};
