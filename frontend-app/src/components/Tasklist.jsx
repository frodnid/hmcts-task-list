import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

export default function Tasklist({ tasksChangedFlag, setTasksChangedFlag }) {
  const [currentTasks, setTasks] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:9090/api/tasks").then(({ data: { tasks } }) => {
      setTasks(tasks);
      if (tasksChangedFlag) {
        setTasksChangedFlag(false);
      }
    });
  }, [tasksChangedFlag, setTasksChangedFlag]);

  if (!currentTasks) {
    return <div>Loading</div>;
  }

  return (
    <ul>
      {currentTasks.map((task) => {
        return <TaskCard task={task} setTasksChangedFlag={setTasksChangedFlag} key={task.task_id}/>
      })}
    </ul>
  );
}
