// Home.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import ParallaxSection from "../components/ui/ParallaxSection";
import PosterCarousel from "../components/ui/PosterCarousel";
import GoogleAd from "../components/layout/GoogleAd";
import Title from "../components/common/Title";
import Divider from "../components/common/Divider";
import SearchBarWithDropdown from "@components/common/SearchBarWithDropDown";

export default function Home() {
    return (
        <>
            {/* PARALLAX WRAPS EVERYTHING BELOW */}
            <ParallaxSection image="/assets/images/welcome-bg.png">
                {/* --- Decorative ticket + title + dividers --- */}
                <div style={{ textAlign: "center", paddingBlock: "2.5rem" }}>
                        <Title>Welcome to HermesPass</Title>
                    </div>



                <Button variant="primary" href="/events">
                    Explore Events
                </Button>

                {/* CAROUSELS */}
                <Container className="my-5">
                    <PosterCarousel
                        eventType="MovieSchema"
                        title="Now Showing — Movies"
                    />
                    <PosterCarousel
                        eventType="ConcertSchema"
                        title="Upcoming Concerts"
                    />
                    <PosterCarousel
                        eventType="TheatreSchema"
                        title="Live Theatre"
                    />
                    <PosterCarousel
                        eventType="OtherEventSchema"
                        title="Other Exciting Events"
                    />
                </Container>

                <Container className="my-4">
                    <GoogleAd slot="1234567890" />
                </Container>
            </ParallaxSection>
        </>
    );
}
