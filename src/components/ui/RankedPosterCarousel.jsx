// components/RankedPosterCarousel.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DEFAULT_IMG = "/assets/images/no-poster.png";
const API = "http://localhost:3000";

export default function RankedPosterCarousel({ title, strategy, eventType, location }) {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams({
            strategy,
            eventType,
            ...(strategy === "location" && location
                ? { lat: location.lat, lng: location.lng }
                : {}),
        });

        axios
            .get(`${API}/api/events/ranked?${params.toString()}`)
            .then((res) => {
                setEvents(res.data?.events || []);
            })
            .catch(() => setEvents([]));
    }, [strategy, eventType, location]);

    if (!events.length) return null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="mb-5">
            <h3
                className="mb-3"
                style={{
                    color: "var(--cloud)",
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 600,
                }}
            >
                {title}
            </h3>

            <Slider {...settings}>
                {events.map((ev) => (
                    <div
                        key={ev.eventId}
                        className="px-2 poster-hover-wrapper"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/event/${ev.eventId}`)}
                    >
                        <img
                            src={ev.posterImage || DEFAULT_IMG}
                            alt={ev.name}
                            className="img-fluid shadow-sm poster-hover-img"
                            style={{ height: 320, width: "100%", objectFit: "cover" }}
                        />
                        <h6
                            className="text-center mt-2"
                            style={{ color: "var(--cloud)", fontWeight: 500 }}
                        >
                            {ev.name}
                        </h6>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
