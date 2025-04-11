// src/components/layout/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";
import axios from "axios";

export default function Navbar() {
    const [location, setLocation] = useState(localStorage.getItem("userLocationName") || "");
    const [showModal, setShowModal] = useState(false);
    const [manualInput, setManualInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("userLocationCoords")) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
                    setLocation("Using GPS");
                    localStorage.setItem("userLocationCoords", coords);
                    localStorage.setItem("userLocationName", "Using GPS");
                },
                () => {
                    // Permission denied => show modal
                    setShowModal(true);
                }
            );
        }
    }, []);

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setManualInput(query);
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: query,
                    format: "json",
                    addressdetails: 1,
                    limit: 5
                }
            });
            setSuggestions(res.data);
        } catch (err) {
            console.error("Autocomplete error:", err);
        }
    };

    const handleSelect = (item) => {
        const coords = `${item.lat},${item.lon}`;
        const name = item.display_name;
        localStorage.setItem("userLocationCoords", coords);
        localStorage.setItem("userLocationName", name);
        setLocation(name);
        setShowModal(false);
    };

    return (
        <>
            <RBNavbar bg="dark" variant="dark" expand="md">
                <Container>
                    <RBNavbar.Brand href="#">
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
                            <Nav.Link href="#">Home</Nav.Link>
                            <Nav.Link href="#">Events</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                        </Nav>
                        <span className="text-light small">
              📍 {location || "Detecting..."}
            </span>
                    </RBNavbar.Collapse>
                </Container>
            </RBNavbar>

            {/* Modal for location input */}
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
