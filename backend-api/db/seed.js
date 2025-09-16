const { db } = require("./connection");

exports.seed = function() {

    return db.query("DROP TABLE IF EXISTS tasks;")
        .then(()=> {
            console.log("dropped")
            return db.query(`
                CREATE TABLE tasks (
                    task_id SERIAL PRIMARY KEY,
                    title VARCHAR NOT NULL,
                    description VARCHAR DEFAULT NULL,
                    status VARCHAR CHECK (status = 'TODO' OR status = 'COMPLETED'),
                    due_date DATE NOT NULL 
                    ); `)
        }).then(()=> {
            console.log("created")
            return db.query(`
                INSERT INTO tasks (title, description, status, due_date)
                VALUES 
                ('Database', 'create a db that works with node', 'TODO', '2025-09-20'),
                ('Testing', 'create unit tests', 'TODO', '2025-09-20'),
                ('Meal', 'eat breakfast', 'COMPLETED', '2025-09-16'),
                ('Walk', DEFAULT, 'COMPLETED', '2025-09-16');`)
        })


}