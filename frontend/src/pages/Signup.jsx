import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Login.css";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/users/register/", {
        username,
        email,
        password,
      });

      // After successful signup → login page
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Please sign up to continue!</p>
        </div>

        <form className="login-body" onSubmit={handleSubmit}>
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-button" type="submit">
            Signup
          </button>

          <div className="signup-text">
            Already have an account?{" "}
            <span
              style={{ color: "#ffb703", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Signin
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
