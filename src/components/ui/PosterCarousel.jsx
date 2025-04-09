import Slider from "react-slick";
import { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PosterCarousel = () => {
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        axios.get("/api/events")
            .then(res => setPosters(res.data.events))
            .catch(err => console.error(err));
    }, []);

    const settings = {
        dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1, autoplay: true
    };

    return (
        <div className="my-10 mx-6">
            <Slider {...settings}>
                {posters.map(poster => (
                    <div key={poster.eventId} className="px-2">
                        <img src={poster.posterImage} alt={poster.name} className="rounded-lg shadow-lg h-72 object-cover w-full" />
                        <h3 className="text-center mt-2 text-white">{poster.name}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PosterCarousel;
