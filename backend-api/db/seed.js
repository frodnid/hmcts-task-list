const { db } = require("./connection");
const { tasksData } = require("./data");
const format = require("pg-format");

exports.seed = function () {
  return db
    .query("DROP TABLE IF EXISTS tasks;")
    .then(() => {
      return db.query(`
                CREATE TABLE tasks (
                    task_id SERIAL PRIMARY KEY,
                    title VARCHAR NOT NULL,
                    description VARCHAR DEFAULT NULL,
                    status VARCHAR CHECK (status = 'TODO' OR status = 'COMPLETED' OR status = 'IN PROGRESS'),
                    due_date DATE NOT NULL
                    ); `);
    })
    .then(() => {
      return db.query(
        format(
          "INSERT INTO tasks(title, description, status, due_date) VALUES %L",
          tasksData.map((JSON) => Object.values(JSON))
        )
      );
    });
};
