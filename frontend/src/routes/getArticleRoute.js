"use strict";
import { withDB } from "../db.js";
// get article endpoint (with :name)
export const getArticleRoute = {
  path: "/api/articles/:name",
  method: "get",
  handler: async (req, res) => {
    const name = req.params.name;
    withDB(async (db) => {
      const article = await db.collection("articles").findOne({ name: name });
      res.status(200).json(article);
    }, res);
  },
};
