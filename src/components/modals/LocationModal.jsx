import { useState } from "react";
import axios from "axios";

const LocationModal = ({ show, setLocation, close }) => {
    const [manualInput, setManualInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: query,
                format: "json",
                limit: 5
            }
        });
        setSuggestions(res.data);
    };

    const handleSelect = (place) => {
        localStorage.setItem("userLocationCoords", `${place.lat},${place.lon}`);
        localStorage.setItem("userLocationName", place.display_name);
        setLocation(place.display_name);
        close();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-xl w-96 shadow-2xl">
                <h2 className="text-xl font-semibold mb-4">Enter Your City</h2>
                <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => {
                        setManualInput(e.target.value);
                        if (e.target.value.length > 2) fetchSuggestions(e.target.value);
                    }}
                    placeholder="Search city..."
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <ul className="max-h-40 overflow-y-auto mt-2">
                    {suggestions.map((s, idx) => (
                        <li
                            key={idx}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleSelect(s)}
                        >
                            {s.display_name}
                        </li>
                    ))}
                </ul>
                <div className="mt-4 text-right">
                    <button onClick={close} className="btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
