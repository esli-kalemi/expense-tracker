import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";
import Header from "./components/Header";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Filter from "./components/Filter";
import SpendingChart from "./components/SpendingChart";
import Auth from "./components/Auth";

function App() {
  const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [databaseError, setDatabaseError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingTransaction, setEditingTransaction] = useState(null);
  useEffect(() => {
        const getUser = async () => {
            const {
            data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
        };

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
        }, []);

        useEffect(() => {
        if (!user) {
            return;
        }

        const loadTransactions = async () => {
            setLoading(true);
            setDatabaseError("");

            const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .order("date", { ascending: false });

            if (error) {
            console.error("Error fetching transactions:", error);
            setDatabaseError("Unable to load your transactions. Please try again.");
            setLoading(false);
            return;
            }

            setTransactions(data);
            setLoading(false);
        };

        loadTransactions();
        }, [user]);

const addTransaction = async (transaction) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id: user.id,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding transaction:", error);
    return;
  }

  setTransactions((currentTransactions) => [
    ...currentTransactions,
    data,
  ]);
};

const deleteTransaction = async (id) => {
    const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting transaction:", error);
        return;
    }

    setTransactions((currentTransactions) =>
        currentTransactions.filter((transaction) => transaction.id !== id)
    );
    };

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
        }
        };

const updateTransaction = async (updatedTransaction) => {
  const { data, error } = await supabase
    .from("transactions")
    .update({
      description: updatedTransaction.description,
      amount: updatedTransaction.amount,
      type: updatedTransaction.type,
      category: updatedTransaction.category,
    })
    .eq("id", updatedTransaction.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating transaction:", error);
    return;
  }

  setTransactions((currentTransactions) =>
    currentTransactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? data
        : transaction
    )
  );

  setEditingTransaction(null);
};

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const filteredTransactions =
    selectedCategory === "All"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.category === selectedCategory
        );
        if (!user) {
            return (
                <div className="app">
                <Header />
                <Auth />
                </div>
            );
            }
  return (
    <div className="app">
    <Header user={user} onLogout={handleLogout} />
        {loading && (
    <p className="loading-message">
        Loading your transactions...
    </p>
    )}

    {databaseError && (
    <p className="database-error">
        {databaseError}
    </p>
    )}

      <Summary
        balance={balance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />

        <div className="dashboard-grid">
        <TransactionForm
            key={editingTransaction?.id ?? "new"}
            onAddTransaction={addTransaction}
            editingTransaction={editingTransaction}
            onUpdateTransaction={updateTransaction}
            onCancelEdit={cancelEdit}
        />

        <SpendingChart transactions={transactions} />
        </div>

        <Filter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        />

        <TransactionList
        transactions={filteredTransactions}
        onDeleteTransaction={deleteTransaction}
        onEditTransaction={editTransaction}
        />      
    </div>
  );
}

export default App;