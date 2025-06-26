import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "../components/Theme";
import confetti from "canvas-confetti";
import TodoItem from "./TodoItem";
import Modal from "./Modal";
import UsernameModal from "./UsernameModal";
import FilterButtons from "./FilterButtons";
import { motion, AnimatePresence } from "framer-motion";

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
  const [username, setUsername] = useState(
    () => localStorage.getItem("checkit-username") || ""
  );
  const [tempUsername, setTempUsername] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const showUsernameModal = !username;
  const hasCelebrated = useRef(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (
      todos.length &&
      todos.every((t) => t.completed) &&
      !hasCelebrated.current
    ) {
      confetti({ particleCount: 500, spread: 999, origin: { y: 0.6 } });
      hasCelebrated.current = true;
    } else if (!todos.every((t) => t.completed)) {
      hasCelebrated.current = false;
    }
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      { id: Date.now(), text: input, dueDate, completed: false },
      ...todos,
    ]);
    setInput("");
    setDueDate("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setConfirmDeleteId(null);
  };

  const handleUsernameSubmit = () => {
    const trimmed = tempUsername.trim();
    if (trimmed) {
      localStorage.setItem("checkit-username", trimmed);
      setUsername(trimmed);
      setTempUsername("");
    }
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("todos");
    localStorage.removeItem("checkit-username");
    setTodos([]);
    setUsername("");
    setTempUsername("");
    setShowLogoutModal(false);
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "active"
      ? !todo.completed
      : filter === "completed"
      ? todo.completed
      : true
  );

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

      <FilterButtons filter={filter} setFilter={setFilter} />

      <ul>
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() =>
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                )
              }
              onDelete={() => setConfirmDeleteId(todo.id)}
            />
          ))}
        </AnimatePresence>
      </ul>

      {confirmDeleteId && (
        <Modal
          message="Are you sure you want to delete this task?"
          onConfirm={() => handleDelete(confirmDeleteId)}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      {showUsernameModal && (
        <UsernameModal
          tempUsername={tempUsername}
          setTempUsername={setTempUsername}
          handleUsernameSubmit={handleUsernameSubmit}
        />
      )}

      {showLogoutModal && (
        <Modal
          message="Are you sure you want to logout and reset all data?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}

export default Todos;
