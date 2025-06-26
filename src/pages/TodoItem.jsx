import { Trash2, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <span
        onClick={onToggle}
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
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
            style={{ marginLeft: "26px", fontSize: "0.75rem", opacity: 0.7 }}
          >
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </small>
        )}
      </span>
      <button className="btn-small btn-danger" onClick={onDelete}>
        <Trash2 size={15} />
      </button>
    </motion.li>
  );
}
