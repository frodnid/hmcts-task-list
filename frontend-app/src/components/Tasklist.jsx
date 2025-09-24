import axios from "axios";
import { useEffect, useState } from "react";
export default function Tasklist() {
  const [currentTasks, setTasks] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:9090/api/tasks").then(({ data: { tasks } }) => {
      setTasks(tasks);
    });
  }, []);

  if (!currentTasks) {
    return <div>Loading</div>;
  }

  return (
    <ul>
      {currentTasks.map((task) => {
        return (
          <div className="card">
            <button onClick={()=> {
                return axios.delete(`http://localhost:9090/api/tasks/${task.task_id}`)
            }}>X</button>
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
            <div className="task-status">{task.status}</div>
            <div className="task-due-date">{task.due_date}</div>
            <br />
          </div>
        );
      })}
    </ul>
  );
}
