const express = require("express");
const { getTasks } = require("./controller");

const app = express();

app.use(express.json());

app.get("/api/tasks", getTasks);


module.exports = app;