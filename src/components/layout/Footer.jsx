// src/components/layout/Footer.jsx
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container text-center">
                <p className="mb-1">
                    Powered by <strong>Hermes</strong> — god of speed and journeys.
                </p>
                <div className="mt-2 d-flex justify-content-center gap-4">
                    <a href="#" className="text-light text-decoration-none">
                        About
                    </a>
                    <a href="#" className="text-light text-decoration-none">
                        Contact
                    </a>
                    <a href="#" className="text-light text-decoration-none">
                        Terms
                    </a>
                </div>
                <p className="mt-2 text-secondary" style={{ fontSize: "0.85rem" }}>
                    © {new Date().getFullYear()} HermesPass. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
