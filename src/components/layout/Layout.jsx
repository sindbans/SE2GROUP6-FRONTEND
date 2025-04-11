// src/components/layout/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Global Layout that:
 * 1) Displays a Navbar at the top of every page
 * 2) Places the page’s main content in a flex container
 * 3) Places the Footer at the bottom if the page is short (sticky bottom).
 */
const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Global Navbar for all pages */}
            <Navbar />

            {/* Main content grows to push footer down */}
            <main className="flex-grow-1">
                {children}
            </main>

            {/* Footer pinned to bottom if content is short */}
            <Footer />
        </div>
    );
};

export default Layout;
