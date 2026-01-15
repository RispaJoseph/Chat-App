import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    navigate("/rooms");
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign-in to continue!</p>
        </div>

        <form className="login-body" onSubmit={handleSubmit}>
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

          <div className="forgot">Forget your password?</div>

          <button className="login-button" type="submit">
            Signin
          </button>

          <div className="signup-text">
            Don’t have an account?{" "}
            <span
              style={{ color: "#ffb703", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
