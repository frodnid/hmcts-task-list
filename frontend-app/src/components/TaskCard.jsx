import axios from "axios";
import StatusSelector from "./StatusSelector";
import { useState } from "react";

export default function TaskCard({ task, setTasksChangedFlag }) {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="card">
      <button
        onClick={() => {
          return axios
            .delete(`http://localhost:9090/api/tasks/${task.task_id}`)
            .then(() => {
              setTasksChangedFlag(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        X
      </button>
      <button onClick={()=> {
        setIsVisible(!isVisible);
      }}>edit status</button>
      { isVisible && <StatusSelector task={task} setTasksChangedFlag={setTasksChangedFlag} setIsVisible={setIsVisible}/>}
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-status">{task.status}</div>
      <div className="task-due-date">{task.due_date}</div>
      <br />
    </div>
  );
}
