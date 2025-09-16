const { db } = require("./db/connection");

exports.fetchTasks = function() {
    return db.query("SELECT * FROM TASKS").then(({rows}) => rows)
}