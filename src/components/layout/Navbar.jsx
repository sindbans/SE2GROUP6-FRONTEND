import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
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
                    setShowModal(true); // Permission denied
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
            <nav className="bg-black text-white p-4 flex justify-between">
                <h1 className="text-2xl font-bold">HermesPass</h1>
                <p className="text-sm italic">📍 {location || "Detecting..."}</p>
            </nav>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-bold mb-3">Where are you located?</h2>
                        <input
                            type="text"
                            placeholder="Enter city or location"
                            className="w-full border border-gray-300 rounded p-2 mb-2"
                            value={manualInput}
                            onChange={handleInputChange}
                        />
                        <ul className="max-h-40 overflow-y-auto">
                            {suggestions.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                                    onClick={() => handleSelect(item)}
                                >
                                    {item.display_name}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
