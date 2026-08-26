function SpendingChart({ transactions }) {
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const categories = {};

  expenses.forEach((transaction) => {
    if (categories[transaction.category]) {
      categories[transaction.category] += transaction.amount;
    } else {
      categories[transaction.category] = transaction.amount;
    }
  });

  const categoryEntries = Object.entries(categories);
  const totalSpent = expenses.reduce(
    (total, transaction) => total + transaction.amount,
    0
    );
  const maxAmount =
    categoryEntries.length > 0
      ? Math.max(...categoryEntries.map(([, amount]) => amount))
      : 0;

  return (
    <section className="spending-chart">
      <div className="spending-chart-header">
        <h2>Spending by Category</h2>
        <p>
        See where your money is going. Total spent:{" "}
        <strong>${totalSpent.toFixed(2)}</strong>
        </p>      
        </div>

      {categoryEntries.length === 0 ? (
        <p className="chart-empty">
          Add some expenses to see your spending breakdown.
        </p>
      ) : (
        <div className="chart-bars">
          {categoryEntries.map(([category, amount]) => {
            const percentage = (amount / maxAmount) * 100;

            return (
              <div className="chart-row" key={category}>
                <div className="chart-label">
                  <span>{category}</span>
                  <strong>${amount.toFixed(2)}</strong>
                </div>

                <div className="bar-background">
                  <div
                    className="bar"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SpendingChart;