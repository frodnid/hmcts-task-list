const { db } = require("../db/connection");
const { seed } = require("../db/seed");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed();
});

afterAll(() => {
  return db.end();
});

describe("app", () => {
  describe("General 404 - Invalid Path", () => {
    test("Should respond with status 404", () => {
      return request(app).get("/api/somewhere").expect(404);
    });
    test("Should respond with an appropriate error message JSON", () => {
      return request(app)
        .get("/api/over_the_rainbow")
        .expect("Content-type", /json/)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Path not found.");
        });
    });
  });
  describe("/api/tasks", () => {
    describe("GET", () => {
      test("should respond with a JSON containing an array of task objects.", () => {
        return request(app)
          .get("/api/tasks")
          .expect(200)
          .expect("Content-type", /json/)
          .then(({ body }) => {
            expect(Array.isArray(body.tasks)).toBe(true);
            body.tasks.forEach((task) => {
              expect(typeof task).toBe("object");
            });
          });
      });
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
            });
          });
      });
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
            });
          });
      });
      test("status should only be one of the following: TODO, IN PROGRESS, or COMPLETED", () => {
        return request(app)
          .get("/api/tasks")
          .then(({ body: { tasks } }) => {
            tasks.forEach((task) => {
              expect(task.status).toMatch(/TODO|IN PROGRESS|COMPLETED/);
            });
          });
      });
      test("task array should be ordered by creation date", () => {
        return db
          .query(
            `INSERT INTO tasks (title, description, status, due_date) VALUES ('Example', 'example', 'TODO', '2025-12-31')`
          )
          .then(() => {
            return request(app)
              .get("/api/tasks")
              .then(({ body: { tasks } }) => {
                expect(tasks[0].title).toBe("Example");
              });
          });
      });
    });
    describe("POST", () => {
      test("201 - Should create entry when passed task object", () => {
        return request(app)
          .post("/api/tasks")
          .send({
            status: "COMPLETED",
            title: "New Title",
            description: "New Description",
            due_date: "2026-01-01",
          })
          .expect(201)
          .then(() => {
            return db.query("SELECT task_id, title, description, status, due_date FROM tasks WHERE task_id = 11;");
          })
          .then(({ rows }) => {
            expect(rows[0].title).toBe("New Title");
            expect(rows[0].description).toBe("New Description");
            expect(rows[0].status).toBe("COMPLETED");
            expect(rows[0].due_date).toEqual(new Date("2026-01-01"));
          });
      });
      test("Should respond with a JSON containing the created task object", () => {
        return request(app)
          .post("/api/tasks")
          .send({
            status: "COMPLETED",
            title: "New Title",
            description: "New Description",
            due_date: "2026-01-01",
          })
          .then(({ body: { task } }) => {
            expect(typeof task).toBe("object");
            expect(task).toEqual({
              task_id: 11,
              title: "New Title",
              description: "New Description",
              status: "COMPLETED",
              due_date: "2026-01-01T00:00:00.000Z",
            });
          });
      });
      describe("400 - Bad Requests:", () => {
        test("invalid properties", () => {
          return request(app)
            .post("/api/tasks")
            .send({
              bacon: "COMPLETED",
              beer: "New Title",
              cheese: "New Description",
              crackers: "2026-01-01",
            })
            .expect(400);
        });
        test("invalid data", () => {
          return request(app)
            .post("/api/tasks")
            .send({
              status: 0.01,
              title: "New Title",
              description: "New Description",
              due_date: "2026-01-01",
            })
            .expect(400);
        });
        test("should send an appropriate error message", () => {
          return request(app)
            .post("/api/tasks")
            .send({
              status: 0.01,
              title: "New Title",
              description: "New Description",
              due_date: "2026-01-01",
            })
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad request.");
            });
        });
      });
    });
    describe("405 INVALID METHOD", () => {
      const invalidMethods = ["patch", "put", "delete"];
      test("Should respond with status 405 for invalid methods", () => {
        return Promise.all(
          invalidMethods.map((method) => {
            return request(app)[method]("/api/tasks").expect(405);
          })
        );
      });
      test("Should respond with an appropriate error message JSON", () => {
        return Promise.all(
          invalidMethods.map((method) => {
            return request(app)
              [method]("/api/tasks")
              .expect("Content-type", /json/)
              .then(({ body: { msg } }) => {
                expect(msg).toBe("Method not allowed.");
              });
          })
        );
      });
    });
  });
  describe("/api/tasks/:id", () => {
    describe("GET", () => {
      test("Should respond with a JSON containing a single task object", () => {
        return request(app)
          .get("/api/tasks/2")
          .expect(200)
          .expect("Content-type", /json/)
          .then(({ body }) => {
            expect(typeof body.task).toBe("object");
            expect(Array.isArray(body.task)).toBe(false);
          });
      });
      test("Task object should contain 5 properties: id, title, description, status, due date", () => {
        return request(app)
          .get("/api/tasks/2")
          .then(({ body: { task } }) => {
            expect(task).toHaveProperty("task_id");
            expect(task).toHaveProperty("title");
            expect(task).toHaveProperty("description");
            expect(task).toHaveProperty("status");
            expect(task).toHaveProperty("due_date");
            expect(Object.keys(task).length).toBe(5);
          });
      });
      test("Should provide current data", () => {
        return db
          .query(
            `INSERT INTO tasks (title, description, status, due_date) VALUES ('Example', 'example', 'TODO', '2025-12-31')`
          )
          .then(() => {
            return request(app)
              .get("/api/tasks/11")
              .then(({ body: { task } }) => {
                expect(task.title).toBe("Example");
              });
          });
      });
      test("400 - invalid id", () => {
        return request(app)
          .get("/api/tasks/whoops")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad request.");
          });
      });
    });

    describe("PATCH", () => {
      describe("200 - Should update db entry for task for the following properties:", () => {
        test("title", () => {
          return request(app)
            .patch("/api/tasks/1")
            .send({ title: "New Title" })
            .expect(200)
            .then(() => {
              return db.query("SELECT title FROM tasks WHERE task_id = 1;");
            })
            .then(({ rows }) => {
              expect(rows[0].title).toBe("New Title");
            });
        });
        test("description", () => {
          return request(app)
            .patch("/api/tasks/2")
            .send({ description: "New Description" })
            .expect(200)
            .then(() => {
              return db.query(
                "SELECT description FROM tasks WHERE task_id = 2;"
              );
            })
            .then(({ rows }) => {
              expect(rows[0].description).toBe("New Description");
            });
        });
        test("status", () => {
          return request(app)
            .patch("/api/tasks/3")
            .send({ status: "TODO" })
            .expect(200)
            .then(() => {
              return db.query("SELECT status FROM tasks WHERE task_id = 3;");
            })
            .then(({ rows }) => {
              expect(rows[0].status).toBe("TODO");
            });
        });
        test("due date", () => {
          return request(app)
            .patch("/api/tasks/4")
            .send({ due_date: "2026-12-12" })
            .expect(200)
            .then(() => {
              return db.query("SELECT due_date FROM tasks WHERE task_id = 4;");
            })
            .then(({ rows }) => {
              expect(rows[0].due_date).toEqual(new Date("2026-12-12"));
            });
        });
      });
      test("Should update entries correctly when passed multiple properties in any order", () => {
        return request(app)
          .patch("/api/tasks/1")
          .send({
            status: "COMPLETED",
            title: "New Title",
            description: "New Description",
          })
          .expect(200)
          .then(() => {
            return db.query("SELECT * FROM tasks WHERE task_id = 1;");
          })
          .then(({ rows }) => {
            expect(rows[0].title).toBe("New Title");
            expect(rows[0].description).toBe("New Description");
            expect(rows[0].status).toBe("COMPLETED");
          });
      });
      test("Should respond with a JSON containing the updated task object", () => {
        return request(app)
          .patch("/api/tasks/1")
          .send({
            status: "COMPLETED",
            title: "New Title",
            description: "New Description",
          })
          .then(({ body: { task } }) => {
            expect(typeof task).toBe("object");
            expect(task).toEqual({
              task_id: 1,
              title: "New Title",
              description: "New Description",
              status: "COMPLETED",
              due_date: expect.any(String),
            });
          });
      });
      describe("400 - Bad Requests:", () => {
        test("invalid property", () => {
          return request(app)
            .patch("/api/tasks/1")
            .send({ fish: "and chips" })
            .expect(400);
        });
        test("invalid data", () => {
          return request(app)
            .patch("/api/tasks/1")
            .send({ status: 0.001 })
            .expect(400);
        });
        test("should send an appropriate error message", () => {
          return request(app)
            .patch("/api/tasks/1")
            .send({ status: 0.001 })
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Bad request.");
            });
        });
      });
    });
    describe("DELETE", () => {
      test("Should respond with status code 204", () => {
        return request(app).delete("/api/tasks/2").expect(204);
      });
      test("Should remove a specific row from the database", () => {
        return request(app)
          .delete("/api/tasks/3")
          .expect(204)
          .then(() => {
            return db.query("SELECT task_id FROM tasks;");
          })
          .then(({ rows }) => {
            expect(rows.length).toBe(9);
            expect(rows.includes(3)).toBe(false);
          });
      });
      test("400 - id not found", () => {
        return request(app)
          .delete("/api/tasks/9999")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad request.");
          });
      });

      test("400 - invalid id", () => {
        return request(app)
          .delete("/api/tasks/jgkhdlgbd")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad request.");
          });
      });
    });
    describe("405 INVALID METHOD", () => {
      const invalidMethods = ["post", "put"];
      test("Should respond with status 405 for invalid methods", () => {
        return Promise.all(
          invalidMethods.map((method) => {
            return request(app)[method]("/api/tasks/2").expect(405);
          })
        );
      });
      test("Should respond with an appropriate error message JSON", () => {
        return Promise.all(
          invalidMethods.map((method) => {
            return request(app)
              [method]("/api/tasks/2")
              .expect("Content-type", /json/)
              .then(({ body: { msg } }) => {
                expect(msg).toBe("Method not allowed.");
              });
          })
        );
      });
    });
  });
});
