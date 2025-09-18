const { db } = require("./db/connection");

exports.fetchTasks = function() {
    return db.query("SELECT * FROM TASKS").then(({rows}) => rows)
}

exports.fetchTask = function(task_id) {
    return db.query("SELECT * FROM TASKS WHERE task_id = $1;", [task_id]).then(({rows}) => rows[0]);
}