import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function TransactionItem({
  transaction,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDeleteTransaction(transaction.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="transaction-item">
        <div className="transaction-info">
          <h3>{transaction.description}</h3>

          <p>
            {transaction.category} • {transaction.date || "No date"}
          </p>
        </div>

        <div className="transaction-actions">
          <strong className={transaction.type}>
            {transaction.type === "income" ? "+" : "-"}$
            {transaction.amount.toFixed(2)}
          </strong>

          <div className="transaction-buttons">
            <button
              className="edit-button"
              onClick={() => onEditTransaction(transaction)}
            >
              Edit
            </button>

            <button
              className="delete-button"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default TransactionItem;