const { db } = require("../db/connection");
const { seed } = require("../db/seed");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
    return seed();
});

afterAll(() => {
    return db.end();
})

describe("app", () => {
    describe("/api/tasks", () => {
        describe("GET", () => {
            test("should respond with a JSON containing an array of task objects.", ()=> {
                return request(app)
                    .get("/api/tasks")
                    .expect(200)
                    .expect("Content-type", /json/)
                    .then(({ body }) => {
                        expect(Array.isArray(body.tasks)).toBe(true);
                        body.tasks.forEach((task) => {
                            expect(typeof task).toBe("object");
                        })
                    })
            })
            test("tasks should contain 5 db properties: id, title, description, status and due date", () => {
                return request(app)
                .get("/api/tasks")
                .then(({ body: { tasks } }) => {
                    tasks.forEach((task) => {
                        expect(task).toHaveProperty("task_id");
                        expect(task).toHaveProperty("title");
                        expect(task).toHaveProperty("description");
                        expect(task).toHaveProperty("status");
                        expect(task).toHaveProperty("due_date");
                        expect(Object.keys(task).length).toBe(5);
                    })
                })
            })
            test("task object data should only be of a certain data type", () => {
                return request(app)
                .get("/api/tasks")
                .then(({ body: { tasks } }) => {
                    tasks.forEach((task) => {
                       expect(typeof task.task_id).toBe("number");
                       expect(typeof task.title).toBe("string");
                       expect(typeof task.description).toBe("string");
                       expect(typeof task.status).toBe("string");
                       expect(typeof task.due_date).toBe("string");
                       
                    })
                })
            })
            test("status should only be one of the following: TODO, IN PROGRESS, or COMPLETED", () => {
                return request(app)
                .get("/api/tasks")
                .then(({ body: { tasks } }) => {
                    tasks.forEach((task) => {
                       expect(task.status).toMatch(/TODO|IN PROGRESS|COMPLETED/)
                    })
                })
            })
            test("should provide current data", () => {
                return db.query(
                    `INSERT INTO tasks (title, description, status, due_date) VALUES ('Example', 'example', 'TODO', '2025-12-31')`
                )
                .then(() => {
                    return request(app)
                    .get("/api/tasks")
                    .then(({ body: { tasks } }) => {
                       expect(tasks[10].title).toBe("Example");
                    })
                })
            })
        })
    })
})