// src/components/layout/Navbar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Navbar as RBNavbar,
    Nav,
    Container,
    Collapse,
} from "react-bootstrap";
import SearchBarWithDropdown from "@components/common/SearchBarWithDropDown";

export default function Navbar() {
    /* ---------- location logic ... unchanged ---------- */
    const [location, setLocation] = useState(
        localStorage.getItem("userLocationName") || ""
    );
    const [showModal, setShowModal] = useState(false);
    const [manualInput, setManualInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    /* ---------- auth state ---------- */
    const [userName, setUserName] = useState(
        localStorage.getItem("hp_name") || null
    );

    /* ---------- NEW: search‑bar toggle ---------- */
    const [showSearch, setShowSearch] = useState(false);
    const toggleSearch = () => setShowSearch((prev) => !prev);

    /* ---------- side‑effects unchanged ---------- */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nameFromURL = params.get("name");
        if (nameFromURL) {
            localStorage.setItem("hp_name", nameFromURL);
            setUserName(nameFromURL);
        }
        const handleStorage = () =>
            setUserName(localStorage.getItem("hp_name"));
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    /* ---------- city autocomplete debounce (unchanged) ---------- */
    useEffect(() => {
        if (manualInput.length < 3) return setSuggestions([]);
        const t = setTimeout(async () => {
            try {
                const res = await axios.get(
                    "https://nominatim.openstreetmap.org/search",
                    {
                        params: {
                            q: manualInput,
                            format: "json",
                            addressdetails: 1,
                            limit: 5,
                        },
                    }
                );
                setSuggestions(res.data);
            } catch {
                setSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(t);
    }, [manualInput]);

    return (
        <>
            <RBNavbar bg="dark" variant="dark" expand="md" className="py-2">
                <Container>
                    <RBNavbar.Brand href="/">
                        <img
                            src="/assets/icons/hermes-wing.png"
                            alt="Hermes Wing"
                            width="28"
                            height="28"
                            className="me-2 d-inline-block align-top"
                        />
                        HermesPass
                    </RBNavbar.Brand>


                    <RBNavbar.Collapse id="hp-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/events">Events</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                        </Nav>

                        <div className="d-flex align-items-center">
                            {/* search toggle (hidden on collapse toggle) */}
                            <button
                                onClick={toggleSearch}
                                className="btn p-0 border-0 bg-transparent me-3"
                                style={{ lineHeight: 0 }}
                            >
                                <img
                                    src="/assets/icons/search.png"
                                    alt="search"
                                    width="20"
                                    height="20"
                                />
                            </button>

                            <RBNavbar.Toggle aria-controls="hp-nav" />
                        </div>


                        {/* location display */}
                        <span
                            className="nav-animated-text me-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setShowModal(true);
                                setManualInput("");
                                setSuggestions([]);
                            }}
                        >
              📍 {location || "Detecting…"}
            </span>

                        {/* auth links / greeting */}
                        {userName ? (
                            <span className="nav-animated-text">Hi, {userName}</span>
                        ) : (
                            <>
                                <Nav.Link href="/auth/login" className="nav-animated-text me-3">
                                    Login
                                </Nav.Link>
                                <Nav.Link href="/auth/register" className="nav-animated-text">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                    </RBNavbar.Collapse>
                </Container>
            </RBNavbar>

            {/* slide‑down search bar */}
            <Collapse in={showSearch}>
                <div className="bg-dark py-3">
                    <Container style={{ maxWidth: 600 }}>
                        <SearchBarWithDropdown autoFocus />
                    </Container>
                </div>
            </Collapse>

            {/* location modal (unchanged) */}
            {showModal && (
                /* … existing modal code … */
                <></>
            )}
        </>
    );
}
