import { withDB } from "../db.js";

// Increase upvotes of an article by 1
export const postUpvoteRoute = {
  path: "/api/articles/:name/upvotes",
  method: "post",
  handler: async (req, res) => {
    const name = req.params.name;
    withDB(async (db) => {
      const article = await db.collection("articles").findOneAndUpdate(
        { name: name },
        {
          $inc: {
            upvotes: 1,
          },
        }
      ); // close find and update
      const uArticle = await db.collection("articles").findOne({ name: name });
      res.status(200).json(uArticle);
    }, res);
  },
};
