export default function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-small" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn-small btn-danger" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
