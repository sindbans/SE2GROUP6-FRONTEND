import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import the pages
import Home from "./pages/Home";
import TicketWallet from "./pages/TicketWallet";
import ParallaxTesting from "./pages/playground/ParallaxTesting";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EventPage from "./pages/EventPage";
import SearchResultsPage from "./pages/SearchResultsPage";



// ✅ Import your components
import SeatSelectionPage from './pages/SeatSelectionPage';
import ConcertSeatSelectionPage from './pages/ConcertSeatSelectionPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';

// Import the layout
import Layout from "./components/layout/Layout";

const App = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Existing routes wrapped with Layout */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/wallet" element={<Layout><TicketWallet /></Layout>} />
                <Route path="/test/play" element={<Layout><ParallaxTesting /></Layout>} />
                <Route path="/auth/register" element={<Layout><Register /></Layout>} />
                <Route path="/auth/login" element={<Layout><Login /></Layout>} />
                <Route path="/search-results" element={<Layout><SearchResultsPage /></Layout>} />
                <Route path="/event/:eventId" element={<Layout><EventPage /></Layout>} />


                {/* ✅ Your added pages */}
                <Route path="/select-seats" element={<Layout><SeatSelectionPage /></Layout>} />
                <Route path="/select-seats-concert" element={<Layout><ConcertSeatSelectionPage /></Layout>} />
                <Route path="/payment" element={<Layout><PaymentPage /></Layout>} />
                <Route path="/payment-success" element={<Layout><PaymentSuccessPage /></Layout>} />
                <Route path="/payment-failure" element={<Layout><PaymentFailurePage /></Layout>} />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
