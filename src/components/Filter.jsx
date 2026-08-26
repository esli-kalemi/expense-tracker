function Filter({ selectedCategory, onCategoryChange }) {
  return (
    <section className="filter">
      <label htmlFor="filter-category">Filter by category:</label>

      <select
        id="filter-category"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
    </section>
  );
}

export default Filter;