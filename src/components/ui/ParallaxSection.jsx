// src/components/ui/ParallaxSection.jsx
import React from "react";
import { Parallax } from "react-parallax";
import { Container } from "react-bootstrap";

const ParallaxSection = ({ image, children }) => {
    return (
        <Parallax bgImage={image} strength={500}>
            <div style={{ minHeight: "420px" }}>
                <Container className="d-flex justify-content-center align-items-center h-100">
                    <div className="text-center text-white">
                        {children}
                    </div>
                </Container>
            </div>
        </Parallax>
    );
};

export default ParallaxSection;
