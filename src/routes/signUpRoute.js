"use strict";

import { getDbConnection } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as UUID } from "uuid";
import { sendEmail } from "../util/sendEmail.js";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });
    const verificationString = UUID();
    if (user) {
      res.sendStatus(409);
      return;
    }
    const passHash = await bcrypt.hash(password, 10);
    const startInfo = {
      name: "",
      lastName: "",
      hairColor: "",
      favFood: "",
      bio: "",
    };
    const result = await db.collection("users").insertOne({
      email,
      passHash,
      info: startInfo,
      isVerified: false,
      verificationString,
    });
    const { insertedID } = result;

    try {
      await sendEmail({
        to: email,
        from: "milad.hassani@gmail.com",
        subject: "Please verify your email",
        text: `Thanks for signing up! To verify your email, click here:
           http://localhost:3000/verify-email/${verificationString}
           `,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
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
