function TransactionItem({
  transaction,
  onDeleteTransaction,
  onEditTransaction,
}) {
  return (
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
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to delete this transaction?"
              );

              if (confirmed) {
                onDeleteTransaction(transaction.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;