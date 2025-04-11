// src/pages/Home.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import PosterCarousel from "../components/ui/PosterCarousel";
import ParallaxSection from "../components/ui/ParallaxSection";
import GoogleAd from "../components/layout/GoogleAd";
import Title from "../components/common/Title";
import Divider from "../components/common/Divider";
// No Navbar or Footer imports now!

const Home = () => {
    return (
        <>
            <ParallaxSection image="/assets/images/parallax-bg.jpg">
                <Title>Welcome to HermesPass</Title>
                <Button variant="primary">Explore Events</Button>
            </ParallaxSection>

            <Divider />

            <Container className="my-4">
                <PosterCarousel />
            </Container>

            <Container className="my-4">
                <GoogleAd slot="1234567890" />
            </Container>
        </>
    );
};

export default Home;
