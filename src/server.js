const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const path = require("path");
const app = express();

const withDB = async (operations, res, name) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {});
    const db = client.db("my-blog");

    await operations(db);

    client.close();
  } catch (error) {
    res.status(500).json("Error connecting to db", error);
  }
};

app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());

// Get article endpoint (with :name)
app.get("/api/articles/:name", async (req, res) => {
  const name = req.params.name;
  withDB(async (db) => {
    const article = await db.collection("articles").findOne({ name: name });
    res.status(200).json(article);
  }, res);
});

app.post("/api/articles/:name/upvotes", async (req, res) => {
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
});

app.post("/api/articles/:name/comment", (req, res) => {
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
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
app.listen(8000, () => console.log("listening to port 8000"));
