function Summary({ balance, totalIncome, totalExpenses }) {
  return (
    <section className="summary">
      <div className="summary-card">
        <h3>Balance</h3>
        <p>${balance.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>Income</h3>
        <p>${totalIncome.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>Expenses</h3>
        <p>${totalExpenses.toFixed(2)}</p>
      </div>
    </section>
  );
}

export default Summary;