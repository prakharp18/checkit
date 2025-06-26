import React, { useState, useEffect, useRef } from "react";
import { Trash2, CheckSquare } from "lucide-react";
import ThemeToggle from "../components/Theme";
import confetti from "canvas-confetti";

function Todos() {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos")) || [];
    } catch {
      return [];
    }
  });

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [username, setUsername] = useState(
    () => localStorage.getItem("checkit-username") || ""
  );
  const [tempUsername, setTempUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(!username);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const hasCelebrated = useRef(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (todos.length > 0 && todos.every((todo) => todo.completed)) {
      if (!hasCelebrated.current) {
        confetti({ particleCount: 500, spread: 999, origin: { y: 0.6 } });
        hasCelebrated.current = true;
      }
    } else {
      hasCelebrated.current = false;
    }
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      dueDate,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
    setDueDate("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setConfirmDeleteId(null);
  };

  const handleUsernameSubmit = () => {
    const trimmed = tempUsername.trim();
    if (trimmed) {
      localStorage.setItem("checkit-username", trimmed);
      setUsername(trimmed);
      setShowUsernameModal(false);
    }
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("todos");
    localStorage.removeItem("checkit-username");
    window.location.reload();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <ThemeToggle />
      <button
        onClick={() => setShowLogoutModal(true)}
        className="theme-toggle-btn"
        style={{ float: "right", marginRight: "0.5rem" }}
      >
        🔄 Logout
      </button>

      <h1>{username && `Welcome, ${username}`}</h1>

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

      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="date-input"
      />

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setFilter("all")}
          className={`btn-small ${filter === "all" ? "btn-active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`btn-small ${filter === "active" ? "btn-active" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`btn-small ${filter === "completed" ? "btn-active" : ""}`}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
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
                flexDirection: "column",
                alignItems: "flex-start",
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <CheckSquare
                  size={18}
                  style={{
                    marginRight: "8px",
                    color: todo.completed ? "var(--accent)" : "#ccc",
                  }}
                />
                {todo.text}
              </span>
              {todo.dueDate && (
                <small
                  style={{
                    marginLeft: "26px",
                    fontSize: "0.75rem",
                    opacity: 0.7,
                  }}
                >
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </small>
              )}
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

      {showUsernameModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Welcome to CheckIt 🎯</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "1px solid #ccc",
                margin: "1rem 0",
                width: "100%",
              }}
            />
            <button onClick={handleUsernameSubmit} className="btn-small">
              Start Using CheckIt
            </button>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to logout and reset all data?</p>
            <div className="modal-actions">
              <button className="btn-small" onClick={handleLogoutConfirm}>
                Yes, Reset
              </button>
              <button
                className="btn-small btn-danger"
                onClick={() => setShowLogoutModal(false)}
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
