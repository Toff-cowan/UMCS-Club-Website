import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const API = "http://localhost:5000/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminToken")) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", data.username || "admin");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Could not reach server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-subtitle">UMCS Club Dashboard</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            className="admin-login-input"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="admin-login-input"
            autoComplete="current-password"
            required
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
