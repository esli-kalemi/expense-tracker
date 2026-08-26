function Header({ user, onLogout }) {
  return (
    <header className="header">
      <h1>Expense Tracker</h1>
      <p>Track your income and expenses easily.</p>

      {user && (
        <div className="user-section">
          <span>{user.email}</span>

          <button onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;