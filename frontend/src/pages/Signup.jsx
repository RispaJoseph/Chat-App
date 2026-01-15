import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Signup() {
  const navigate = useNavigate(); // ✅ FIX 1

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Signup:", { username, email, password });
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Please sign up to continue!</p>
        </div>

        <form className="login-body" onSubmit={handleSubmit}>
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
            Signup {/* ✅ FIX 2 */}
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
