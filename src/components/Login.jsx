import { useState } from "react";
import { AuthError, MissingIdentityError } from "@netlify/identity";
import { useAuth } from "../context/useAuth";

function Login() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const user = await signUp(email, password, name);
        if (!user.emailVerified) {
          setMessage("Account created. Check your email to confirm your account, then sign in.");
          setMode("login");
        }
      } else {
        await signIn(email, password);
      }
    } catch (authError) {
      if (authError instanceof MissingIdentityError) {
        setError("Authentication is not enabled for this site yet.");
      } else if (authError instanceof AuthError && authError.status === 401) {
        setError("Invalid email or password.");
      } else if (authError instanceof AuthError && authError.status === 403) {
        setError("Account registration is not available.");
      } else if (authError instanceof AuthError) {
        setError(authError.message);
      } else {
        setError("Authentication was unsuccessful. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setMessage("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        boxSizing: "border-box",
        background: "#0f172a",
        color: "#f8fafc",
      }}
    >
      <section
        style={{
          width: "min(100%, 420px)",
          padding: "40px",
          border: "1px solid #334155",
          borderRadius: "16px",
          background: "#1e293b",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.25)",
        }}
      >
        <p style={{ color: "#38bdf8", fontWeight: 700, marginBottom: "8px" }}>
          GATE MATE AI
        </p>
        <h1 style={{ margin: "0 0 12px", color: "#f8fafc", fontSize: "36px" }}>
          Welcome back
        </h1>
        <p style={{ color: "#cbd5e1", marginBottom: "28px" }}>
          {mode === "login"
            ? "Sign in to open your GATE 2027 preparation tracker."
            : "Create an account to save access to your preparation tracker."}
        </p>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
          {mode === "signup" && (
            <input
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              style={inputStyle}
            />
          )}
          <input
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "13px 18px",
              border: 0,
              borderRadius: "8px",
              background: isSubmitting ? "#94a3b8" : "#38bdf8",
              color: "#0f172a",
              cursor: isSubmitting ? "wait" : "pointer",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {isSubmitting
              ? "Please wait…"
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>
        <button
          type="button"
          onClick={changeMode}
          style={{
            marginTop: "18px",
            padding: 0,
            border: 0,
            background: "transparent",
            color: "#7dd3fc",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          {mode === "login" ? "Need an account? Sign up" : "Already registered? Sign in"}
        </button>
        {error && (
          <p role="alert" style={{ color: "#fca5a5", marginTop: "16px" }}>
            {error}
          </p>
        )}
        {message && (
          <p role="status" style={{ color: "#86efac", marginTop: "16px" }}>
            {message}
          </p>
        )}
      </section>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  boxSizing: "border-box",
  border: "1px solid #475569",
  borderRadius: "8px",
  background: "#0f172a",
  color: "#f8fafc",
  fontSize: "16px",
};

export default Login;
