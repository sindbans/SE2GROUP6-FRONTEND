// src/pages/Register.jsx
import React, { useState } from "react";
import { Parallax } from "react-parallax";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Register page with parallax background (RegisterLoginBG.png).
 * The registration form is displayed as a white card with gold accent
 * in the center, matching the HermesPass theme.
 */
export default function Register() {
    const navigate = useNavigate();

    // Form States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    // UI Feedback
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Basic validations
        if (!firstName || !lastName || !email || !password) {
            setError("Please fill out all required fields.");
            return;
        }
        if (password !== confirmPass) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    dateOfBirth,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed");
            } else {
                setSuccess("Registration successful!");
                // Optionally redirect to login or something
                // navigate("/login");
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
                {/* We'll use motion for a subtle fade/slide in */}
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
                    {/* Title in gold */}
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
                        Register
                    </h2>

                    {/* Error / Success messages */}
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
                        {/* First Name */}
                        <div style={{ marginBottom: "1rem" }}>
                            <label
                                htmlFor="firstName"
                                style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}
                            >
                                First Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.25rem",
                                    fontSize: "0.95rem",
                                }}
                            />
                        </div>

                        {/* Last Name */}
                        <div style={{ marginBottom: "1rem" }}>
                            <label
                                htmlFor="lastName"
                                style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}
                            >
                                Last Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.25rem",
                                    fontSize: "0.95rem",
                                }}
                            />
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: "1rem" }}>
                            <label
                                htmlFor="email"
                                style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}
                            >
                                Email <span style={{ color: "red" }}>*</span>
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

                        {/* Date of Birth */}
                        <div style={{ marginBottom: "1rem" }}>
                            <label
                                htmlFor="dob"
                                style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}
                            >
                                Date of Birth
                            </label>
                            <input
                                id="dob"
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
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
                                Password <span style={{ color: "red" }}>*</span>
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

                        {/* Confirm Password */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label
                                htmlFor="confirmPass"
                                style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}
                            >
                                Re-enter Password <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="confirmPass"
                                type="password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.25rem",
                                    fontSize: "0.95rem",
                                }}
                            />
                        </div>

                        {/* Submit Button */}
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
                            Register
                        </button>
                    </form>
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

                </motion.div>
            </div>
        </Parallax>
    );
}
