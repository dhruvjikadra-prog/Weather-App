import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../assets/Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      setError("Invalid credentials. Please check your email and password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", storedUser.name);
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <i className="fas fa-cloud-sun"></i>
          ProWeather
        </div>

        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to unlock full forecast access</p>

        <form onSubmit={handleLogin}>

          <div className="input-group-label">Email</div>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <div className="input-group-label">Password</div>
          <div className="password-field">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <span onClick={() => setShowPass(!showPass)}>
              {showPass ? "Hide" : "Show"}
            </span>
          </div>

          {error && (
            <p className="error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </p>
          )}

          <button type="submit">
            <i className="fas fa-sign-in-alt me-2"></i>
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Create one free</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
