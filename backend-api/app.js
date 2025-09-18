const express = require("express");
const { getTasks, getTask } = require("./controllers/tasks");
const { handlePathNotFound, handleMethodNotAllowed } = require("./controllers/errors");

const app = express();

app.use(express.json());

app.route("/api/tasks")
    .get(getTasks)
    .all(handleMethodNotAllowed);

app.route("/api/tasks/:id")
    .get(getTask);

app.use(handlePathNotFound);

module.exports = app;