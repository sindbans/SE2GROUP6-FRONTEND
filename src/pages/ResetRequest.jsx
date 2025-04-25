// src/pages/ResetRequest.jsx
import React, { useState } from "react";

export default function ResetRequest() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      setMsg("Reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="container py-5">
      <h2>Forgot your password?</h2>
      <p>Enter your email to get a reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {msg && <p className="text-success mt-2">{msg}</p>}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
