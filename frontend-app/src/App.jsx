import { useState } from "react";
import hmctsLogo from "./assets/cropped-HMCTS-logo-1.webp";
import Tasklist from "./components/Tasklist";
import "./App.css";
import TaskCreationForm from "./components/TaskCreationForm";

function App() {
  return (
    <>
      <div>
        <img src={hmctsLogo} />
      </div>
      <h1>Task List:</h1>
      <TaskCreationForm></TaskCreationForm>
      <Tasklist></Tasklist>
    </>
  );
}

export default App;
