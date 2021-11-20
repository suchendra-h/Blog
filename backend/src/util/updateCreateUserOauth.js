import { getGoogleUser } from "./getGoogleUser.js";
import { getDbConnection } from "../db.js";

export const updateCreateUserOauth = async ({ oauthUserInfo }) => {
  const { id: googleID, verified_email: isverified, email } = oauthUserInfo;
  const db = getDbConnection("react-auth-db");
  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    const results = await db
      .collection("users")
      .findOneAndUpdate(
        { email },
        { $set: { googleID, isverified } },
        { returnOriginal: false, returnDocument: "after" }
      );
    return results.value;
  } else {
    try {
      const result = await db
        .collection("users")
        .insertOne({ email, googleID, isverified, info: {} });
      return result.ops[0];
    } catch (error) {
      console.log(error);
    }
  }
};
