const { Pool } = require("pg");

const ENV = process.env.NODE_ENV;

console.log("ENV: ", ENV);

exports.db = new Pool({ database: "tasklist_test" });
