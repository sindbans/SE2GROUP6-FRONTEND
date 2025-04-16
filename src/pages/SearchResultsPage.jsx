import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

/**
 * Displays search results in horizontal cards.
 * Uses query params to request from /api/search
 * Navigates to /event/:eventId using eventController for details.
 */
export default function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const type = searchParams.get("type") || "all";
    const query = searchParams.get("query") || "";

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:3000/api/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: type,
                        query: query,
                        uid: "guest"
                    })
                });
                const data = await res.json();
                setResults(data.results || []);
            } catch (err) {
                console.error("Search error:", err);
                setResults([]);
            }
            setLoading(false);
        };
        fetchResults();
    }, [type, query]);

    return (
        <div className="px-6 py-8 bg-gray-100 min-h-screen">
            <h2 className="text-xl font-bold mb-6">
                Results for: <span className="text-gold">{query}</span>
            </h2>

            {loading ? (
                <p>Loading...</p>
            ) : results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div className="space-y-6">
                    {results.map((event) => (
                        <div
                            key={event.eventUUID || event.eventId || event._id}
                            className="flex bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105"
                            onClick={() => navigate(`/event/${event.eventUUID || event.eventId || event._id}`)}
                        >
                            <div className="w-1/3 min-w-[120px]">
                                <img
                                    src={event.posterImage || "/assets/images/no-image.png"}
                                    alt={event.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1 p-4">
                                <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">{event.eventType}</p>
                                <p className="text-sm text-gray-400">
                                    {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "No date"}
                                </p>
                                <input type="hidden" value={event.eventUUID || event.eventId || event._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
