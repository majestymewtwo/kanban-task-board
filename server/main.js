const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const clientRouter = require("../server/routes/client");
const tasksRouter = require("../server/routes/tasks");
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

const url = process.env.MONGO_URL || "mongodb://localhost:27017/kanban-board";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => console.log("Connected to DB"))
  .catch((e) => {
    console.error(e);
    console.log("Error connecting to database");
  });

app.use(clientRouter);
app.use(tasksRouter);

app.listen(5000, () => {
  console.log("Server started");
});
