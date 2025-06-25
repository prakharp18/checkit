import React, { useState } from "react";
import { Trash2, CheckSquare } from "lucide-react";
import ThemeToggle from "../components/Theme";

function Todos() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  console.log("Todos component rendering");
  return (
    <div className="container">
      <ThemeToggle />
      <h1>📝 CheckIt</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <CheckSquare size={18} style={{ marginRight: "8px" }} />
            {todo.text}
            <button
              className="btn-small btn-danger"
              onClick={() => handleDelete(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
