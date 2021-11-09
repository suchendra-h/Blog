"use strict";

import { frontEndRoute } from "./frontEndRoute.js";
import { getArticleRoute } from "./getArticleRoute.js";
import { postCommentRoute } from "./postCommentRoute.js";
import { postUpvoteRoute } from "./postUpvoteRoute.js";

export const routes = [
  getArticleRoute,
  postCommentRoute,
  postUpvoteRoute,
  frontEndRoute,
];
