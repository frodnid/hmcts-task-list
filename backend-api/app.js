const express = require("express");
const cors = require("cors");
const {
  getTasks,
  postTask,
  getTask,
  patchTask,
  deleteTask,
} = require("./controllers/tasks");
const {
  handlePathNotFound,
  handleMethodNotAllowed,
  handleBadRequest,
  handleCustomBadRequest,
} = require("./controllers/errors");

const app = express();

app.use(cors())
app.use(express.json());

app
  .route("/api/tasks")
  .get(getTasks)
  .post(postTask)
  .all(handleMethodNotAllowed);

app
  .route("/api/tasks/:id")
  .get(getTask)
  .patch(patchTask)
  .delete(deleteTask)
  .all(handleMethodNotAllowed);

app.use(handleBadRequest);

app.use(handleCustomBadRequest);

app.use(handlePathNotFound);

module.exports = app;
