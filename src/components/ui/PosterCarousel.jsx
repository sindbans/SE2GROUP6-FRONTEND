// src/components/ui/PosterCarousel.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PosterCarousel = () => {
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        axios.get("/api/events")
            .then(res => {
                const events = res.data?.events || [];
                setPosters(events);
            })
            .catch(err => {
                console.error(err);
                setPosters([]);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true
    };

    if (!posters.length) {
        return (
            <p className="text-muted">
                No events to display
            </p>
        );
    }

    return (
        <div className="my-3">
            <Slider {...settings}>
                {posters.map((poster) => (
                    <div key={poster.eventId} className="px-2">
                        <img
                            src={poster.posterImage}
                            alt={poster.name}
                            className="rounded img-fluid"
                        />
                        <h6 className="text-center mt-2">{poster.name}</h6>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PosterCarousel;
