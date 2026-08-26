import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {  return (
    <section className="transaction-list">
      <div className="transaction-list-header">
        <h2>Transactions</h2>
        <span>{transactions.length} transaction(s)</span>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-message">No transactions found.</p>
      ) : (
        <div className="transaction-items">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDeleteTransaction={onDeleteTransaction}
              onEditTransaction={onEditTransaction}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;