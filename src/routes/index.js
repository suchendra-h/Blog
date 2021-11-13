"use strict";

import { frontEndRoute } from "./frontEndRoute.js";
import { getArticleRoute } from "./getArticleRoute.js";
import { loginRoute } from "./loginRoute.js";
import { postCommentRoute } from "./postCommentRoute.js";
import { postUpvoteRoute } from "./postUpvoteRoute.js";
import { signUpRoute } from "./signUpRoute.js";

export const routes = [
  getArticleRoute,
  postCommentRoute,
  postUpvoteRoute,
  frontEndRoute,
  signUpRoute,
  loginRoute,
];
