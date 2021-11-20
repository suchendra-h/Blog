"use strict";

import { frontEndRoute } from "./frontEndRoute.js";
import { getArticleRoute } from "./getArticleRoute.js";
import { googleOauthUrlRoute } from "./googleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { loginRoute } from "./loginRoute.js";
import { postCommentRoute } from "./postCommentRoute.js";
import { postUpvoteRoute } from "./postUpvoteRoute.js";
import { signUpRoute } from "./signUpRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { verifyEmailRoute } from "./verifyEmailRoute.js";

export const routes = [
  getArticleRoute,
  postCommentRoute,
  postUpvoteRoute,
  //   frontEndRoute,
  signUpRoute,
  loginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  googleOauthUrlRoute,
  googleOauthCallbackRoute,
];
