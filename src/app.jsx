// src/app.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// Import the pages
import Home from "./pages/Home";
import TicketWallet from "./pages/TicketWallet";
import ParallaxTesting from "./pages/playground/ParallaxTesting"; // adjust path as needed
import Register from "./pages/Register";
import Login from "./pages/Login";
import EventPage from "./pages/EventPage";
// Import the new Layout
import Layout from "./components/layout/Layout";
import SearchResultsPage from "./pages/SearchResultsPage";

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
                <Route
                    path="/auth/register"
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />
                <Route
                    path="/auth/login"
                    element={
                        <Layout>
                            <Login />
                        </Layout>
                    }
                />
                <Route
                    path="/search-results"
                    element={
                        <Layout>
                            <SearchResultsPage />
                        </Layout>
                    }
                />

                    {/* existing routes */}
                <Route path="/event/:eventId" element={<Layout><EventPage /></Layout>} />
                {/* Add more routes as needed, always wrapped in <Layout> */}
            </Routes>
        </AnimatePresence>
    );
};

export default App;
