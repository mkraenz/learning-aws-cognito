import React, { useState } from "react";
import "./App.css";
import CreateTodoForm from "./CreateTodoForm";

function App() {
  const [count, setCount] = useState(0);

  return <CreateTodoForm />;
}

export default App;
