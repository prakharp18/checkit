import React, { useState, useEffect } from "react";
import { Trash2, CheckSquare } from "lucide-react";
import ThemeToggle from "../components/Theme";
import confetti from "canvas-confetti";
import { useRef } from "react";

function Todos() {
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const hasCelebrated = useRef(false);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (todos.length > 0 && todos.every((todo) => todo.completed)) {
      if (!hasCelebrated.current) {
        confetti({
          particleCount: 500,
          spread: 999,
          origin: { y: 0.6 },
        });
        hasCelebrated.current = true;
      }
    } else {
      hasCelebrated.current = false;
    }
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setConfirmDeleteId(null);
  };

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
            <span
              onClick={() =>
                setTodos((prev) =>
                  prev.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                flexGrow: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              <CheckSquare
                size={18}
                style={{
                  marginRight: "8px",
                  color: todo.completed ? "var(--accent)" : "#ccc",
                }}
              />
              {todo.text}
            </span>
            <button
              className="btn-small btn-danger"
              onClick={() => setConfirmDeleteId(todo.id)}
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>

      {confirmDeleteId !== null && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-actions">
              <button
                className="btn-small"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Yes, Delete
              </button>
              <button
                className="btn-small btn-danger"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todos;
