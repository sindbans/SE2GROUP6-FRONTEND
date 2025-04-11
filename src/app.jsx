// src/app.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// Import the pages
import Home from "./pages/Home";
import TicketWallet from "./pages/TicketWallet";
import ParallaxTesting from "./pages/playground/ParallaxTesting"; // adjust path as needed
// Import the new Layout
import Layout from "./components/layout/Layout";

const App = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Wrap each page in Layout */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/wallet"
                    element={
                        <Layout>
                            <TicketWallet />
                        </Layout>
                    }
                />
                <Route
                    path="/test/play"
                    element={
                        <Layout>
                            <ParallaxTesting />
                        </Layout>
                    }
                />
                {/* Add more routes as needed, always wrapped in <Layout> */}
            </Routes>
        </AnimatePresence>
    );
};

export default App;
