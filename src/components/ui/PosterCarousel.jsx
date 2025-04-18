// PosterCarousel.jsx
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DEFAULT_IMG = "/assets/images/no-poster.png";
const API = "http://localhost:3000";

export default function PosterCarousel({ eventType, title }) {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${API}/api/events`)
            .then((res) => {
                const all = res.data?.events || [];
                setEvents(all.filter((e) => e.type === eventType));
            })
            .catch(() => setEvents([]));
    }, [eventType]);

    if (!events.length) return null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
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
            {/* carousel heading in brand cloud‑white */}
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
                            className="px-2"
                            style={{cursor: "pointer"}}
                            onClick={() => navigate(`/event/${ev.eventId}`)}
                            >
                        <img
                            src={ev.posterImage || DEFAULT_IMG}
                            alt={ev.name}
                            className="rounded img-fluid shadow-sm"
                            style={{ height: 320, width: "100%", objectFit: "cover" }}
                        />
                        {/* event name in cloud‑white */}
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
