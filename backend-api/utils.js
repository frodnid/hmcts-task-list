const format = require("pg-format");

exports.createParameterizedUpdateQuery = function (taskID, data) {
  const keys = Object.keys(data);
  let str = "UPDATE tasks SET";
  let arr = [];
  keys.forEach((key, i) => {
    const value = data[key];
    arr.push(key, value);
    str += " %I = %L";
    if (i < keys.length - 1) {
      str += ", ";
    }
  });

  str += " WHERE task_id = %L RETURNING task_id, title, description, status, due_date;";
  arr.push(taskID);
  return format(str, ...arr);
};
