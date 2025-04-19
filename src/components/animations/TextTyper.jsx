// src/components/animations/TextTyper.jsx
import React from "react";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: {
            staggerChildren: 0.035,
            delayChildren: i,
        },
    }),
};

const child = {
    hidden: {
        opacity: 0,
        y: `0.25em`,
    },
    visible: {
        opacity: 1,
        y: `0em`,
        transition: {
            duration: 0.4,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    },
};

const TextTyper = ({ text, className = "", delay = 0.2 }) => {
    return (
        <motion.div
            className={`d-inline-flex ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
            custom={delay}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="d-inline-block"
                    style={{ whiteSpace: "pre" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TextTyper;
