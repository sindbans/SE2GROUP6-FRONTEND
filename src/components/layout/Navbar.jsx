// src/components/layout/Navbar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";

/**
 * This version:
 * 1. Shows "Login | Signup" if not logged in,
 *    or "Hi, {userName}" if the user is logged in.
 * 2. Adds hover animation to turn text gold + slightly scale.
 * 3. Maintains location logic from earlier.
 */

export default function Navbar() {
    // Location states
    const [location, setLocation] = useState(localStorage.getItem("userLocationName") || "");
    const [showModal, setShowModal] = useState(false);
    const [manualInput, setManualInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Auth states (assuming userName is stored in sessionStorage for demonstration)
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        // Example logic: if "userName" is stored in sessionStorage, we pull it here
        const storedUser = sessionStorage.getItem("userName");
        if (storedUser) {
            setUserName(storedUser);
        }

        // If no location stored, try geolocation
        if (!localStorage.getItem("userLocationCoords")) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
                    setLocation("Using GPS");
                    localStorage.setItem("userLocationCoords", coords);
                    localStorage.setItem("userLocationName", "Using GPS");
                },
                () => {
                    setShowModal(true);
                }
            );
        }
    }, []);

    // Debounce location input changes
    useEffect(() => {
        if (manualInput.length < 3) {
            setSuggestions([]);
            return;
        }
        const delayDebounce = setTimeout(async () => {
            try {
                const res = await axios.get("https://nominatim.openstreetmap.org/search", {
                    params: {
                        q: manualInput,
                        format: "json",
                        addressdetails: 1,
                        limit: 5
                    }
                });
                setSuggestions(res.data);
            } catch (err) {
                console.error("Autocomplete error:", err);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [manualInput]);

    // Handle input changes
    const handleInputChange = (e) => {
        setManualInput(e.target.value);
    };

    // Select from suggestions
    const handleSelect = (item) => {
        const coords = `${item.lat},${item.lon}`;
        // For example: "Lucknow, Lucknow District, Uttar Pradesh, India"
        const fullName = item.display_name;

        // Only show the text before the first comma
        const shortName = fullName.split(",")[0];

        localStorage.setItem("userLocationCoords", coords);
        localStorage.setItem("userLocationName", shortName);
        setLocation(shortName);
        setShowModal(false);
    };


    // Clicking location text triggers modal
    const handleLocationClick = () => {
        setShowModal(true);
        setManualInput("");
        setSuggestions([]);
    };

    return (
        <>
            <RBNavbar bg="dark" variant="dark" expand="md">
                <Container>
                    <RBNavbar.Brand href="/">
                        <img
                            src="/assets/icons/hermes-wing.png"
                            alt="Hermes Wing Logo"
                            width="30"
                            height="30"
                            className="d-inline-block align-top me-2"
                        />
                        HermesPass
                    </RBNavbar.Brand>

                    <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <RBNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/wallet">Events</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                        </Nav>

                        {/* Location Display (clickable) */}
                        <span
                            className="nav-animated-text ms-auto me-3"
                            onClick={handleLocationClick}
                            style={{ cursor: "pointer" }}
                        >
              📍 {location || "Detecting..."}
            </span>

                        {/* If user is logged in => "Hi, userName", otherwise => Login / Signup */}
                        {userName ? (
                            <span className="nav-animated-text" style={{ cursor: "pointer" }}>
                Hi, {userName}
              </span>
                        ) : (
                            <>
                                <Nav.Link href="/login" className="nav-animated-text me-3">
                                    Login
                                </Nav.Link>
                                <Nav.Link href="/signup" className="nav-animated-text">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                    </RBNavbar.Collapse>
                </Container>
            </RBNavbar>

            {/* Modal for manual location input */}
            {showModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
                    style={{ zIndex: 9999 }}
                >
                    <div className="bg-white p-4 rounded" style={{ width: "400px" }}>
                        <h2 className="mb-3">Where are you located?</h2>
                        <input
                            type="text"
                            placeholder="Enter city or location"
                            className="form-control mb-2"
                            value={manualInput}
                            onChange={handleInputChange}
                        />
                        <ul className="list-group mb-3">
                            {suggestions.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handleSelect(item)}
                                >
                                    {item.display_name}
                                </li>
                            ))}
                        </ul>
                        <div className="text-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
