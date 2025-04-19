// src/components/ScrollSections.jsx
import React from "react";
import "./globals.css";

export default function ScrollSections({ images, children }) {
    return (
        <div className="scroll-container">
            {images.map((img, i) => (
                <section
                    key={i}
                    className="snap-section"
                    style={{ backgroundImage: `url(${img})` }}
                >
                    {/* render only the children (or content) you need for this panel */}
                    {children[i]}
                </section>
            ))}
        </div>
    );
}
