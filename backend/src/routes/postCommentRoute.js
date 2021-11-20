import { withDB } from "../db.js";

// posts a comment
export const postCommentRoute = {
  path: "/api/articles/:name/comment",
  method: "post",
  handler: (req, res) => {
    const name = req.params.name;
    const options = { returnNewDocument: true, new: true };
    withDB(async (db) => {
      const article = await db.collection("articles").findOneAndUpdate(
        { name: name },
        {
          $push: {
            comments: req.body,
          },
        },
        options
      ); // close find and update
      const uArticle = await db.collection("articles").findOne({ name: name });
      res.status(200).json(uArticle);
    }, res);
  },
};
