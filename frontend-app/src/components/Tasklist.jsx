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
          <li>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.status}</div>
            <div>{task.due_date}</div>
            <br />
          </li>
        );
      })}
    </ul>
  );
}
