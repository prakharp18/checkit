export default function UsernameModal({
  tempUsername,
  setTempUsername,
  handleUsernameSubmit,
}) {
  return (
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
  );
}
