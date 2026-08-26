import { useState } from "react";

function TransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const [description, setDescription] = useState(
    editingTransaction?.description || ""
  );

  const [amount, setAmount] = useState(
    editingTransaction?.amount || ""
  );

  const [type, setType] = useState(
    editingTransaction?.type || "expense"
  );

  const [category, setCategory] = useState(
    editingTransaction?.category || "Food"
  );
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!description.trim()) {
    setError("Please enter a description.");
    return;
    }

    if (amount === "" || Number(amount) <= 0) {
    setError("Please enter an amount greater than 0.");
    return;
    }

    if (editingTransaction) {
      const updatedTransaction = {
        ...editingTransaction,
        description,
        amount: Number(amount),
        type,
        category,
      };

      onUpdateTransaction(updatedTransaction);
    } else {
      const newTransaction = {
        id: Date.now(),
        description,
        amount: Number(amount),
        type,
        category,
        date: new Date().toLocaleDateString(),
      };

      onAddTransaction(newTransaction);
    }

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("Food");
  };

  return (
    <section className="transaction-form">
      <h2>
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="description">Description</label>

          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) => {
            setDescription(event.target.value);
            setError("");
            }}            
            placeholder="e.g. Grocery shopping"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>

          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(event) => {
            setAmount(event.target.value);
            setError("");
            }}            
            placeholder="e.g. 50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>

          <select
            id="type"
            value={type}
            onChange={(event) => {
            setType(event.target.value);
            setError("");
            }}          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(event) => {
            setCategory(event.target.value);
            setError("");
            }}          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-buttons">
        <button type="submit">
            {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>

        {editingTransaction && (
            <button
                type="button"
                className="cancel-button"
                onClick={onCancelEdit}
                >
                Cancel
                </button>
            )}
            </div>
      </form>
    </section>
  );
}

export default TransactionForm;