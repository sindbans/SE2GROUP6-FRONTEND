// src/pages/TicketWallet.jsx
import React, { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Button } from "react-bootstrap";
import api from "../utils/api";
import Title from "../components/common/Title";
import Divider from "../components/common/Divider";

const TicketWallet = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await api.get("/tickets/user"); // Replace with your real endpoint
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
        <Container className="py-5">
            <Title>Your Ticket Wallet</Title>
            <Divider />

            {loading ? (
                <div className="text-center my-4">
                    <Spinner animation="border" />
                </div>
            ) : tickets.length === 0 ? (
                <p className="text-center text-muted">No tickets yet</p>
            ) : (
                <Row>
                    {tickets.map((ticket, i) => (
                        <Col xs={12} md={6} lg={4} className="mb-4" key={i}>
                            <div className="border rounded p-3 shadow-sm">
                                <h4>{ticket.eventName}</h4>
                                <p>Date: {new Date(ticket.eventDate).toDateString()}</p>
                                <p>Tier: {ticket.seatTier}</p>
                                <p>Seat: {ticket.seatNumber || "General Admission"}</p>
                                <p>Price: ₹{ticket.price}</p>
                                <div className="text-end mt-3">
                                    <Button variant="outline-primary">Download</Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default TicketWallet;
