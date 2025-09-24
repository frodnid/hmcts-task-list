import { useState } from "react";
import hmctsLogo from "./assets/cropped-HMCTS-logo-1.webp";
import Tasklist from "./components/Tasklist";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <img src={hmctsLogo} />
      </div>
      <h1>Task List:</h1>
      <Tasklist></Tasklist>
    </>
  );
}

export default App;
