const dotenv = require("dotenv").config();
const app = require("./server");
const database = require("./database");

app.listen(app.get("port"), () => {
  console.log("Server on http://localhost:" + app.get("port"));
});
