import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Reusable SearchBarWithDropdown component
 * Allows user to search by category (movies, concerts, etc.) and execute backend-aware search
 */
export default function SearchBarWithDropdown({ defaultType = "all" }) {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState(defaultType);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchTypes = ["all", "movies", "concerts", "theatre", "other"];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        navigate(`/search-results?type=${searchType}&query=${encodeURIComponent(searchTerm)}`);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch(e);
    };

    return (
        <div
            style={{
                padding: "1rem",
                maxWidth: "700px",
                margin: "0 auto",
                position: "relative",
                zIndex: 2,
            }}
        >
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center" }}>
                {/* Dropdown */}
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.95rem",
                    }}
                >
                    {searchTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search for an event, location, or date..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.95rem",
                    }}
                />

                {/* Button */}
                <button
                    type="submit"
                    className="btn-primary"
                    style={{
                        whiteSpace: "nowrap",
                        backgroundColor: "var(--midnight)",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease-in-out"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--gold)";
                        e.currentTarget.style.color = "black";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--midnight)";
                        e.currentTarget.style.color = "white";
                    }}
                >
                    Search
                </button>
            </form>

            {/* Results */}
            {loading ? (
                <p style={{ textAlign: "center", marginTop: "1rem" }}>Searching...</p>
            ) : (
                results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            marginTop: "1rem",
                            maxHeight: "250px",
                            overflowY: "auto",
                        }}
                    >
                        {results.map((event, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(`/event/${event._id}`)}
                                style={{
                                    padding: "0.75rem 1rem",
                                    borderBottom: "1px solid #eee",
                                    cursor: "pointer",
                                }}
                            >
                                {event.name || "Unnamed Event"} - {event.eventType || "Unknown Type"}
                            </div>
                        ))}
                    </motion.div>
                )
            )}
        </div>
    );
}
