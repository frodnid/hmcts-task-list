const { createParameterizedUpdateQuery } = require("../utils");
const { db } = require("./db/connection");

exports.fetchTasks = function() {
    return db.query("SELECT * FROM TASKS").then(({ rows }) => rows)
}

exports.fetchTask = function(task_id) {
    return db.query("SELECT * FROM TASKS WHERE task_id = $1;", [task_id]).then(({ rows }) => rows[0]);
}

exports.updateTask = function(task_id, data) {
    const parameterizedQuery = createParameterizedUpdateQuery(task_id, data);
    return db.query(parameterizedQuery).then(({ rows }) => rows[0])

}

exports.removeTask = function(task_id) {
    return db.query("DELETE FROM TASKS WHERE task_id = $1 RETURNING task_id;", [task_id])
        .then(({ rows }) => {
            if(rows.length === 0) {
                return Promise.reject({
                    status: 400,
                    msg: "Bad request."
                })
            }
        });
}