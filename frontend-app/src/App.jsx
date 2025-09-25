import { useState } from "react";
import hmctsLogo from "./assets/cropped-HMCTS-logo-1.webp";
import Tasklist from "./components/Tasklist";
import "./App.css";
import TaskCreationForm from "./components/TaskCreationForm";

function App() {
  const [tasksChangedFlag, setTasksChangedFlag] = useState(false);
  return (
    <>
      <div>
        <img src={hmctsLogo} />
      </div>
      <h1>Task List:</h1>
      <TaskCreationForm
        setTasksChangedFlag={setTasksChangedFlag}
      ></TaskCreationForm>
      <Tasklist
        tasksChangedFlag={tasksChangedFlag}
        setTasksChangedFlag={setTasksChangedFlag}
      ></Tasklist>
    </>
  );
}

export default App;
