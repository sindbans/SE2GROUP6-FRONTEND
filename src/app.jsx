import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import TicketWallet from "./pages/TicketWallet";

const App = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/wallet" element={<TicketWallet />} />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
