// src/components/layout/Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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
import SearchBarWithDropdown from "@components/common/SearchBarWithDropDown";

export default function Navbar() {
    // —————— location state ——————
    const [location, setLocation] = useState(
        localStorage.getItem("userLocationName") || ""
    );
    const [showModal, setShowModal] = useState(false);
    const [manualInput, setManualInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // —————— auth state ——————
    const [userName, setUserName] = useState(
        localStorage.getItem("hp_name") || null
    );

    // —————— search‑bar toggle ——————
    const [showSearch, setShowSearch] = useState(false);
    const toggleSearch = () => setShowSearch((prev) => !prev);
    const handleLogout = () => {
        localStorage.removeItem("hp_token");
        localStorage.removeItem("hp_name");
        localStorage.removeItem("hp_uid");
        window.location.href = "/auth/login"; // or use useNavigate() from react-router-dom
    };
    
    // —————— pull name from URL or storage changes ——————
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nameFromURL = params.get("name");
        const token = params.get("token");
        const uid = params.get("uid");
    
        if (
            nameFromURL &&
            nameFromURL !== "undefined" &&
            token &&
            token !== "undefined"
        ) {
            // Save to localStorage
            localStorage.setItem("hp_name", nameFromURL);
            localStorage.setItem("hp_token", token);
            localStorage.setItem("hp_uid", uid);
    
            setUserName(nameFromURL);
    
            // Optional: clean the URL
            window.history.replaceState(null, '', window.location.pathname);
        } else {
            // Use fallback from localStorage
            const storedName = localStorage.getItem("hp_name");
            if (storedName) setUserName(storedName);
        }
    
        // Sync storage across tabs
        const handleStorage = () => {
            setUserName(localStorage.getItem("hp_name"));
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);
    

    // —————— debounce input → suggestions ——————
    const debounceTimer = useRef(null);

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (manualInput.length < 3) {
            setSuggestions([]);
            return;
        }

        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(manualInput);
        }, 500);

        return () => clearTimeout(debounceTimer.current);
    }, [manualInput]);

    const fetchSuggestions = async (q) => {
        try {
            const res = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                    params: { q, format: "json", limit: 5 },
                }
            );
            setSuggestions(res.data);
        } catch {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        setManualInput(e.target.value);
    };

    const handleSelect = (place) => {
        localStorage.setItem(
            "userLocationCoords",
            `${place.lat},${place.lon}`
        );
        localStorage.setItem("userLocationName", place.display_name);
        setLocation(place.display_name);
        setShowModal(false);
    };

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
                        </Nav>

                        <div className="d-flex align-items-center">
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
                            onClick={() => setShowModal(true)}
                        >
              📍 {location || "Detecting…"}
            </span>

                        {/* auth links / greeting */}
                        {userName ? (
  <>
    <span className="nav-animated-text me-3">Hi, {userName}</span>
    <Nav.Link
      onClick={() => {
        localStorage.clear();
        window.location.href = "/auth/login"; // You can also use navigate() if you prefer
      }}
      className="nav-animated-text"
      style={{ cursor: "pointer" }}
    >
      Logout
    </Nav.Link>
  </>
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

            {/* in‑Navbar location modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enter Your City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Search city…"
                        value={manualInput}
                        onChange={handleInputChange}
                    />
                    <ListGroup
                        className="mt-2"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                        {suggestions.map((s, i) => (
                            <ListGroup.Item
                                action
                                key={i}
                                onClick={() => handleSelect(s)}
                            >
                                {s.display_name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
