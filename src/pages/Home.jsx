// Home.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import ParallaxSection from "../components/ui/ParallaxSection";
import PosterCarousel from "../components/ui/PosterCarousel";
import GoogleAd from "../components/layout/GoogleAd";
import Title from "../components/common/Title";
import Divider from "../components/common/Divider";
import TextTyper from "../components/animations/TextTyper";

export default function Home() {
    return (
        <>
            {/* HERO SECTION */}
            <ParallaxSection image="/assets/images/Events.png">
                <div className="text-center text-white py-5">
                    <Title>Welcome to HermesPass</Title>
                    <TextTyper
                        text="Your one-stop destination for all events."
                        className="fs-5 my-3"
                    />
                    <Button variant="primary" href="/events">
                        Explore Events
                    </Button>
                </div>
            </ParallaxSection>
            {/* MOVIES */}
            <ParallaxSection image="/assets/images/Events2.png">
                <Container className="text-white text-center py-5">
                    <TextTyper text="Now Showing on the Big Screen" className="fs-4 mb-3" />
                    <PosterCarousel eventType="MovieSchema" title="Now Showing — Movies" />
                </Container>
            </ParallaxSection>

            {/* CONCERTS */}
            <ParallaxSection image="/assets/images/Events3.png">
                <Container className="text-white text-center py-5">
                    <TextTyper text="Turn up the volume!" className="fs-4 mb-3" />
                    <PosterCarousel eventType="ConcertSchema" title="Upcoming Concerts" />
                </Container>
            </ParallaxSection>

            {/* THEATRE */}
            <ParallaxSection image="/assets/images/Events4.png">
                <Container className="text-white text-center py-5">
                    <TextTyper text="Experience the drama unfold" className="fs-4 mb-3" />
                    <PosterCarousel eventType="TheatreSchema" title="Live Theatre" />
                </Container>
            </ParallaxSection>

            {/* OTHER EVENTS */}
            <ParallaxSection image="/assets/images/Events5.png">
                <Container className="text-white text-center py-5">
                    <TextTyper text="Expos, Sports, and Everything Else" className="fs-4 mb-3" />
                    <PosterCarousel eventType="OtherEventSchema" title="Other Exciting Events" />
                </Container>
            </ParallaxSection>

            {/* ADS OR FOOTER CONTENT */}
            <Container className="my-5">
                <GoogleAd slot="1234567890" />
            </Container>
        </>
    );
}
