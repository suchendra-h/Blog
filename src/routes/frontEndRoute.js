export const frontEndRoute = {
  path: "*",
  method: "get",
  handler: (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
  },
};
