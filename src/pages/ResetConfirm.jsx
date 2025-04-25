// src/pages/ResetConfirm.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetConfirm() {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      setMsg("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="container py-5">
      <h2>Reset your password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-success">Reset Password</button>
      </form>
      {msg && <p className="text-success mt-2">{msg}</p>}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
