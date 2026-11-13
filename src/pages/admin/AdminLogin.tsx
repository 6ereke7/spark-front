import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../lib/adminApi";

export function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(password);
      navigate("/admin", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Login failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login">
      <header className="admin-heading">
        <p className="admin-eyebrow">Spark Academy</p>
        <h1>Admin sign in</h1>
      </header>
      <form className="admin-panel admin-login__form" onSubmit={handleSubmit}>
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          required
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
