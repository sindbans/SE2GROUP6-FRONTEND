// src/pages/TicketWallet.jsx

import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Title from "../components/common/Title";
import Divider from "../components/common/Divider";
import Footer from "../components/layout/Footer";

const TicketWallet = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await api.get("/tickets/user"); // Replace with actual API
                setTickets(res.data || []);
            } catch (err) {
                console.error("Error loading tickets:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    return (
        <div className="min-h-screen bg-midnight text-cloud p-6">
            <Title>Your Ticket Wallet</Title>
            <Divider />
            {loading ? (
                <p className="text-center text-sm">Loading tickets...</p>
            ) : tickets.length === 0 ? (
                <p className="text-center italic text-sm text-sky-300">No tickets yet</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket, i) => (
                        <div
                            key={i}
                            className="bg-cloud text-midnight rounded-xl p-4 shadow hover:shadow-lg transition duration-300"
                        >
                            <h3 className="text-lg font-bold">{ticket.eventName}</h3>
                            <p className="text-sm">Date: {new Date(ticket.eventDate).toDateString()}</p>
                            <p className="text-sm">Tier: {ticket.seatTier}</p>
                            <p className="text-sm">Seat: {ticket.seatNumber || "General Admission"}</p>
                            <p className="text-sm">Price: ₹{ticket.price}</p>
                            <div className="mt-3 text-right">
                                <button className="btn-secondary">Download</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default TicketWallet;