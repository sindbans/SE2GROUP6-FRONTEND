// src/components/common/Divider.jsx
import React from "react";

const Divider = () => {
    return (
        <div className="d-flex align-items-center justify-content-center my-4">
            {/* First Icon */}
            <img
                src="/assets/icons/hermes-wing.png"
                alt="Hermes Icon"
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />

            {/* Divider */}
            <hr
                className="flex-grow-1"
                style={{ borderTop: "2px solid gold" }}
            />

            {/* Second Icon */}
            <img
                src="/assets/icons/hermes-wing.png"
                alt="Hermes Icon"
                style={{ width: "24px", height: "24px", marginLeft: "8px" }}
            />
        </div>
    );
};

export default Divider;
