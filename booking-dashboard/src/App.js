import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Movies from './views/Movies';
import Events from './views/Events';
import Theaters from './views/Theaters';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Route */}
        <Route path="/" element={<AdminDashboard />} />

        {/* Navigation Routes */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/events" element={<Events />} />
        <Route path="/theaters" element={<Theaters />} />
      </Routes>
    </Router>
  );
}

export default App;


