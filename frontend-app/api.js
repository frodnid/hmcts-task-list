import axios from "axios";

export function getTasks() {
  return axios.get("http://localhost:9090/api/tasks").catch((err) => {
    console.log(err);
  });
}

export function postTask(taskData) {
  return axios
    .post("http://localhost:9090/api/tasks", taskData)
    .catch((err) => {
      console.log(err);
    });
}

export function deleteTask(taskID) {
  return axios
    .delete(`http://localhost:9090/api/tasks/${taskID}`)
    .catch((err) => {
      console.log(err);
    });
}
export function patchStatus(taskID, status) {
  return axios
    .patch(`http://localhost:9090/api/tasks/${taskID}`, {
      status,
    })
    .catch((err) => {
      console.log(err);
    });
}
