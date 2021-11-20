import path from "path";

const __dirname = path.resolve();
export const frontEndRoute = {
  path: "*",
  method: "get",
  handler: (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
  },
};
