// src/utils/transitions.js

export const fadeSlide = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};
