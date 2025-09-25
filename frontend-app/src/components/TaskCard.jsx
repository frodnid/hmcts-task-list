import StatusSelector from "./StatusSelector";
import { useState } from "react";
import * as api from "../../api";

export default function TaskCard({ task, setTasksChangedFlag }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="card">
      <button
        onClick={() => {
          api.deleteTask(task.task_id).then(() => {
            setTasksChangedFlag(true);
          });
        }}
      >
        X
      </button>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        edit status
      </button>
      {isVisible && (
        <StatusSelector
          task={task}
          setTasksChangedFlag={setTasksChangedFlag}
          setIsVisible={setIsVisible}
        />
      )}
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-status">{task.status}</div>
      <div className="task-due-date">{task.due_date}</div>
      <br />
    </div>
  );
}
