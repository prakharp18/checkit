import React from "react";
import { Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todos />} />
    </Routes>
  );
}

export default App;
