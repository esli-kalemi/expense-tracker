import { useState } from "react";
import { supabase } from "../supabaseClient";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMessage("Login successful!");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMessage(
        "Account created successfully!"
      );
    }
  };

  return (
    <section className="auth">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="auth-email">Email</label>

          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="auth-password">Password</label>

          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      {error && <p className="auth-error">{error}</p>}

      <button
        type="button"
        className="auth-toggle"
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
          setError("");
        }}
      >
        {isLogin
          ? "Don't have an account? Create one"
          : "Already have an account? Login"}
      </button>
    </section>
  );
}

export default Auth;
