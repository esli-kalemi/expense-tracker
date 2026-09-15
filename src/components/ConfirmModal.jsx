function ConfirmModal({ onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <h2>Delete Transaction?</h2>

        <p>
          Are you sure you want to delete this transaction?
        </p>

        <div className="confirm-modal-actions">
          <button
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;