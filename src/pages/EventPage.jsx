import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Spinner,
    Card,
    ListGroup,
    Button,
} from "react-bootstrap";
import {
    motion,
    useViewportScroll,
    useTransform,
} from "framer-motion";

const API = "http://localhost:3000";
const NOMINATIM =
    "https://nominatim.openstreetmap.org/reverse?zoom=16&format=json";

export default function EventPage() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [addressStr, setAddressStr] = useState("");
    const [loading, setLoading] = useState(true);

    /* ---------- fetch ---------- */
    useEffect(() => {
        fetch(`${API}/api/events/${eventId}`)
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((d) => {
                setEvent(d.eventDetails);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [eventId]);

    /* ---------- reverse‑geocode ---------- */
    useEffect(() => {
        if (!event) return;
        if (typeof event.address === "string") {
            setAddressStr(event.address);
            return;
        }
        if (event.address?.coordinates) {
            const [lon, lat] = event.address.coordinates;
            fetch(`${NOMINATIM}&lat=${lat}&lon=${lon}`)
                .then((r) => r.json())
                .then((d) => setAddressStr(d.display_name))
                .catch(
                    () => setAddressStr(`Lat ${lat.toFixed(3)}, Lng ${lon.toFixed(3)}`)
                );
        }
    }, [event]);

    /* ---------- framer scroll‑linked values ---------- */
    const { scrollYProgress } = useViewportScroll();
    const posterTilt = useTransform(scrollYProgress, [0, 1], [0, 8]);   // degrees
    const posterScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const bgShift = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    /* ---------- helpers ---------- */
    const LI = (lbl, val) =>
        val ? (
            <ListGroup.Item className="border-0 px-0 py-1">
                <strong>{lbl}:</strong> {val}
            </ListGroup.Item>
        ) : null;
    const join = (x) => (Array.isArray(x) ? x.join(", ") : "");

    /* ---------- loading / error ---------- */
    if (loading)
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    if (!event)
        return (
            <Container className="py-5 text-center">
                <p>Event not found.</p>
            </Container>
        );

    /* ---------- data ---------- */
    const poster = event.posterImage || "/assets/images/no-poster.png";
    const geo = event.address?.coordinates;
    const date = new Date(event.eventDate).toLocaleDateString();
    const time = new Date(event.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div
            /* backdrop texture set inline so CSS file doesn't need the image path */
            style={{
                backgroundImage: "url('/assets/images/welcome-bg.png')",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
            }}
        >
            {/* drifting logo overlay (scroll‑linked) */}
            <motion.img
                src="/assets/images/TitleBG.png"
                alt=""
                style={{
                    position: "fixed",
                    top: "10%",
                    left: "50%",
                    width: 300,
                    opacity: 0.07,
                    translateX: "-50%",
                    y: bgShift,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
                <Row className="gx-5 gy-4 justify-content-center">
                    {/* poster */}
                    <Col md={4} lg={3}>
                        <motion.div
                            style={{ scale: posterScale, rotate: posterTilt }}
                            transition={{ type: "spring", stiffness: 40 }}
                        >
                            <Card
                                className="shadow-lg"
                                style={{
                                    border: "6px solid #f1e2c5",
                                    borderRadius: "1rem",
                                    overflow: "hidden",
                                    backgroundImage: "url('/assets/images/parchment.jpg')",
                                    backgroundSize: "cover",
                                }}
                            >
                                <Card.Img variant="top" src={poster} />
                            </Card>
                        </motion.div>
                    </Col>

                    {/* info */}
                    <Col md={8} lg={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Card
                                className="shadow-lg"
                                style={{
                                    borderRadius: "1rem",
                                    backgroundColor: "#fffffb",
                                }}
                            >
                                <Card.Body>
                                    <Card.Title
                                        style={{
                                            fontFamily: "'Cinzel', serif",
                                            color: "var(--gold)",
                                            fontSize: "1.9rem",
                                        }}
                                    >
                                        {event.name}
                                    </Card.Title>

                                    <ListGroup variant="flush">
                                        {LI("Date", date)}
                                        {LI("Start", time)}
                                        {LI("Venue", addressStr)}
                                        {LI("Genre", event.genre)}
                                        {LI("Director", event.director)}
                                        {LI("Cast", join(event.cast))}
                                        {LI("Runtime", event.runtime && `${event.runtime} min`)}
                                        {LI("Host", event.host)}
                                        {LI("Performers", join(event.performers))}
                                    </ListGroup>
                                </Card.Body>

                                {geo && (
                                    <div className="px-3 pb-3">
                                        <iframe
                                            title="map"
                                            width="100%"
                                            height="220"
                                            style={{
                                                border: 0,
                                                borderRadius: "0.75rem",
                                            }}
                                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                                                geo[0] - 0.01
                                            }%2C${geo[1] - 0.01}%2C${geo[0] + 0.01}%2C${
                                                geo[1] + 0.01
                                            }&layer=mapnik&marker=${geo[1]}%2C${geo[0]}`}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </Card>

                            {/* CTA */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="text-center mt-4"
                            >
                                <Button variant="primary" size="lg" className="px-5 book-btn">
                                    Book tickets
                                </Button>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
