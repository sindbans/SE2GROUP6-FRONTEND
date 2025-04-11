// src/pages/playground/ParallaxTesting.jsx
import React from "react";
import { Parallax } from "react-parallax";
import { Container } from "react-bootstrap";

const ParallaxTesting = () => {
    return (
        <>
            {/* First Parallax Section */}
            <Parallax bgImage="/assets/parallax/beach.png" strength={300}>
                <div
                    style={{ height: "400px" }}
                    className="d-flex align-items-center justify-content-center"
                >
                    <h2 style={{ color: "#fff", textShadow: "1px 1px 3px #000" }}>
                        Beach Parallax
                    </h2>
                </div>
            </Parallax>

            {/* Some filler content */}
            <Container className="py-4">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet…
                </p>
            </Container>

            {/* Second Parallax Section */}
            <Parallax bgImage="/assets/parallax/forest.png" strength={400}>
                <div
                    style={{ height: "400px" }}
                    className="d-flex align-items-center justify-content-center"
                >
                    <h2 style={{ color: "#fff", textShadow: "1px 1px 3px #000" }}>
                        Forest Parallax
                    </h2>
                </div>
            </Parallax>

            <Container className="my-4">
                <p>More filler text… Scroll to see the parallax in action!</p>
            </Container>
        </>
    );
};

export default ParallaxTesting;
