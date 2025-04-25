// src/pages/Login.jsx
import React, { useState } from "react";
import { Parallax } from "react-parallax";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Navbar as RBNavbar,
    Nav,
    Container,
    Collapse,
    Modal,
    Button,
    Form,
    ListGroup,
} from "react-bootstrap";
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
            } else {

                // navigate("/home");
                localStorage.setItem("hp_token", data.token);
                localStorage.setItem("hp_name", data.name);
                localStorage.setItem("hp_uid", data.uid);
                setSuccess("Login successful!");
                setTimeout(() => navigate("/", {replace : true}), 600 );
            }
        } catch (err) {
            console.error(err);
            setError("Server error. Please try again.");
        }
    };

    return (
        <Parallax
            bgImage="/assets/parallax/RegisterLoginBG.png"
            strength={500}
            style={{ minHeight: "100vh" }}
        >
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        backgroundColor: "white",
                        color: "var(--midnight)",
                        width: "400px",
                        maxWidth: "90%",
                        padding: "2rem",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                    }}
                >
                    <h2
                        style={{
                            color: "var(--gold)",
                            textAlign: "center",
                            marginBottom: "1.5rem",
                            fontFamily: "Cinzel, serif",
                            fontWeight: "600",
                            fontSize: "1.75rem",
                        }}
                    >
                        Login
                    </h2>

                    {error && (
                        <div style={{ marginBottom: "1rem", color: "red", fontSize: "0.9rem" }}>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div style={{ marginBottom: "1rem", color: "green", fontSize: "0.9rem" }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div style={{ marginBottom: "1rem" }}>
                            <label
                                htmlFor="email"
                                style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.25rem",
                                    fontSize: "0.95rem",
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: "1rem" }}>
                            <label
                                htmlFor="password"
                                style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.25rem",
                                    fontSize: "0.95rem",
                                }}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            style={{
                                display: "inline-block",
                                width: "100%",
                                backgroundColor: "var(--gold)",
                                color: "black",
                                border: "none",
                                borderRadius: "9999px",
                                fontWeight: "600",
                                fontSize: "1rem",
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease-in-out",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#ffd700";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--gold)";
                            }}
                        >
                            Login
                        </button>

                        {/* Google Register Button */}
                        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                            <a
                                href="http://localhost:3000/api/auth/google"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    padding: "0.5rem",
                                    backgroundColor: "#ffffff",
                                    color: "#444",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    fontSize: "0.95rem",
                                    fontWeight: "500",
                                    textDecoration: "none",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                    transition: "all 0.2s ease-in-out"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#ffffff";
                                }}
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google"
                                    style={{ width: "18px", height: "18px", marginRight: "10px" }}
                                />
                                Register with Google
                            </a>
                        </div>
                        {/* <div className="text-center mt-3">
  <p style={{ fontSize: "0.85rem" }}>
    Forgot your password?{" "}
    <Link to="/auth/reset" style={{ color: "var(--gold)" }}>
      Reset it here
    </Link>
  </p>
</div> */}

                        {/* Register Redirect */}
                        <div className="text-center mt-3">
                            <p style={{ fontSize: "0.85rem" }}>
                                Don’t have an account?{" "}
                                
                                 <Nav.Link href="/auth/register" className="text-gold" style={{ color: "var(--gold)"}}>
                                      Signup
                                    </Nav.Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </Parallax>
    );
}