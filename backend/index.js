const connecToMongo = require("./db");
const bodyParser = require("body-parser");

const express = require("express");
const userRouter = require("./routes/user");
const notesRouter = require("./routes/notes");

connecToMongo();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
