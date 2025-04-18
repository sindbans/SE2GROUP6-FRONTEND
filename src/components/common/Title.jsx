// src/components/common/Title.jsx
import React from "react";
import Divider from "@components/common/Divider";

export default function Title({ children }) {
    return (
        <>
            <div
                style={{
                    position: "relative",
                    display: "inline-block",
                    textAlign: "center",
                    marginBlock: "2.5rem",
                }}
            >
                {/* Ticket graphic */}
                <img
                    src="/assets/images/TitleBG.png"
                    alt="Hermes ticket"
                    style={{
                        width: "clamp(360px, 50vw, 600px)",
                        height: "auto",
                    }}/>

                {/* Overlay text */}
                <span
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--gold)",
                        fontFamily: "'Cinzel', serif",
                        fontWeight: 700,
                        fontSize: "clamp(1.8rem, 5vw, 3rem)",
                        textShadow: "0 0 6px rgba(0,0,0,.6)",
                        pointerEvents: "none",
                        lineHeight: 1.1,
                    }}
                >
                {children}
            </span>
            </div>
            <Divider/></>
    );
}
