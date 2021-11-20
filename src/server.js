"use strict";
import Express from "express";
import path from "path";
import { routes } from "./routes/index.js";
import { initializeDbConnection } from "./db.js";
const app = Express();
// only for tes
// console.log(routes);
//

const __dirname = path.resolve();
app.use(Express.static(path.join(__dirname, "/build")));
app.use(Express.json());

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

initializeDbConnection().then(() => {
  app.listen(8000, () => console.log("listening to port 8000"));
});
