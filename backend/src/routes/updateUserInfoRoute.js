import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDbConnection } from "../db.js";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;
    // const updates = ({ name, lastName, favoriteFood, hairColor, bio }) =>
    //   ({
    //     name,
    //     lastName,
    //     favoriteFood,
    //     hairColor,
    //     bio,
    //   }(req.body));
    const { name, lastName, favoriteFood, hairColor, bio } = req.body;
    const updates = { name, lastName, favoriteFood, hairColor, bio };
    // console.log("updates:", updates);
    if (!authorization) {
      return res.status(401).send({ message: "No authorization header sent" });
    }

    // The token is stored in the second part it is formates like : "Bearer [token]"
    const token = authorization.split(" ")[1];

    // Confirm that the token stored in the client's browser is not tampered with
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "unable to verify token" });

      // Otherwise we con continue with the token
      const { id, isVerified: is_verified } = decoded;
      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data " });

      //TODO: change it to promp an error or do some se
      //   if (!is_verified) console.log("User not verified");

      const db = getDbConnection("react-auth-db");
      const result = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: { info: updates } },
          { returnOriginal: false, returnDocument: "after" }
        );

      const { email, isVerified, info } = result.value;
      jwt.sign(
        {
          id,
          email,
          info,
          isVerified,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2w",
        },
        (err, token) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            return res.status(200).json({ token });
          }
        }
      );
    });
  },
};
