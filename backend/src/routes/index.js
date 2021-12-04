"use strict";

import { frontEndRoute } from "./frontEndRoute.js";
import { getArticleRoute } from "./getArticleRoute.js";
import { googleOauthUrlRoute } from "./googleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { awsLoginRoute } from "./awsLoginRoute.js";
import { postCommentRoute } from "./postCommentRoute.js";
import { postUpvoteRoute } from "./postUpvoteRoute.js";
import { signUpRoute } from "./signUpRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { verifyEmailRoute } from "./verifyEmailRoute.js";
import { awsForgotPasswordRoute } from "./awsForgotPasswordRoute.js";
import { awsResetPasswordRoute } from "./awsResetPasswordRoute.js";

export const routes = [
  getArticleRoute,
  postCommentRoute,
  postUpvoteRoute,
  //   frontEndRoute,
  signUpRoute,
  awsLoginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,

  // Forgot and reset password routes
  awsForgotPasswordRoute,
  awsResetPasswordRoute,

  // Google OAuth routes
  googleOauthUrlRoute,
  googleOauthCallbackRoute,
];
