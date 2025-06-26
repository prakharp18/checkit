import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") return;
    localStorage.setItem("checkit_user", username);
    onLogin(username);
  };

  return (
    <div className="container">
      <h2>👋 Welcome to CheckIt</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
