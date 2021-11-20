// Creates and returns the URL for Google Oauth (Sign In with Google button)

"use strict";
import { getGoogleOauthUrl } from "../util/getGoogleOauthUrl.js";

export const googleOauthUrlRoute = {
  path: "/auth/google/url",
  method: "get",
  handler: (req, res) => {
    const url = getGoogleOauthUrl();
    res.status(200).json({ url });
  },
};
