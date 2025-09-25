import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import * as api from "../../api";

export default function Tasklist({ tasksChangedFlag, setTasksChangedFlag }) {
  const [currentTasks, setTasks] = useState(null);
  useEffect(() => {
    api.getTasks().then(({ data: { tasks } }) => {
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
        return (
          <TaskCard
            task={task}
            setTasksChangedFlag={setTasksChangedFlag}
            key={task.task_id}
          />
        );
      })}
    </ul>
  );
}
