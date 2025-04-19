// EventsPage.jsx with Parallax, Scroll Animations, and Text Effects
import React, { useEffect, useState } from "react";
import RankedPosterCarousel from "../components/ui/RankedPosterCarousel";
import ParallaxSection from "../components/ui/ParallaxSection";
import { motion } from "framer-motion";
import TextTyper from "@components/animations/TextTyper"; // correct import path

const heroImage = "/assets/images/welcome-bg.png";

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.6, ease: "easeOut" },
    }),
};

const sections = [
    {
        title: "Top Rated Movies",
        strategy: "rating",
        eventType: "MovieSchema",
        subtext: "These earned the public's love",
    },
    {
        title: "Soonest Concerts",
        strategy: "startTime",
        eventType: "ConcertSchema",
        subtext: "These shows are just around the corner",
    },
    {
        title: "Nearby Theatre Shows",
        strategy: "location",
        eventType: "TheatreSchema",
        subtext: "Drama that hits close to home",
    },
    {
        title: "Genre-Based Explorations",
        strategy: "genre",
        eventType: "OtherEventSchema",
        subtext: "The thrill of curiosity, sorted just for you",
    },
];

export default function EventsPage() {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setUserLocation({ lat: coords.latitude, lng: coords.longitude });
            },
            () => setUserLocation(null)
        );
    }, []);

    return (
        <ParallaxSection image={heroImage}>
            <div className="container py-5">
                <motion.h1
                    className="mb-4 text-center"
                    style={{ color: "#F4C430", fontFamily: "'Cinzel', serif" }}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                    variants={textVariants}
                >
                    Discover Events
                </motion.h1>

                {sections.map((sec, idx) => (
                    <motion.div
                        key={idx}
                        className="mb-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        custom={0.1 + idx * 0.15}
                        variants={textVariants}
                    >
                        <TextTyper text={sec.subtext} className="mb-2" />
                        <RankedPosterCarousel
                            title={sec.title}
                            strategy={sec.strategy}
                            eventType={sec.eventType}
                            location={sec.strategy === "location" ? userLocation : undefined}
                        />
                    </motion.div>
                ))}
            </div>
        </ParallaxSection>
    );
}
