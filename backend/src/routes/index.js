"use strict";

import { frontEndRoute } from "./frontEndRoute.js";
import { getArticleRoute } from "./getArticleRoute.js";
import { googleOauthUrlRoute } from "./googleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { awsLoginRoute } from "./awsLoginRoute.js";
import { loginRoute } from "./loginRoute.js";
import { postCommentRoute } from "./postCommentRoute.js";
import { postUpvoteRoute } from "./postUpvoteRoute.js";
import { signUpRoute } from "./signUpRoute.js";
import { awsSignUpRoute } from "./awsSignUpRoute.js";

import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { verifyEmailRoute } from "./verifyEmailRoute.js";
import { awsVerifyEmailRoute } from "./verifyEmailRoute.js";

import { awsForgotPasswordRoute } from "./awsForgotPasswordRoute.js";
import { awsResetPasswordRoute } from "./awsResetPasswordRoute.js";
import { forgotPasswordRoute } from "./forgotPasswordRoute.js";
import { resetPasswordRoute } from "./resetPasswordRoute.js";

export const routes = [
  // Sample blog routes
  getArticleRoute,
  postCommentRoute,
  postUpvoteRoute,
  // Front end route - used in production to serve fron end from the same server
  //   frontEndRoute,

  // Sign up routes
  awsSignUpRoute,
  //   signUpRoute,

  // Login routes
  awsLoginRoute,
  //   loginRoute,

  updateUserInfoRoute,

  // Email verification routes
  awsVerifyEmailRoute,
  //   verifyEmailRoute,

  // Forgot and reset password routes
  awsForgotPasswordRoute,
  awsResetPasswordRoute,
  //   forgotPasswordRoute,
  //   resetPasswordRoute,

  // Google OAuth routes
  googleOauthUrlRoute,
  googleOauthCallbackRoute,
];
