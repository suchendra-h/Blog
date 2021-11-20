import { MongoClient } from "mongodb";

let client;

// Database connection closing and exception handling
export const withDB = async (operations, res, name) => {
  try {
    client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("my-blog");

    await operations(db);

    client.close();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const initializeDbConnection = async () => {
  client = await MongoClient.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
