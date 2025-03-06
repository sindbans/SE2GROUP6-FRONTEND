// // src/App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminDashboard from './pages/AdminDashboard'; // Dashboard page
// import Movies from './views/Movies';
// import Events from './views/Events';
// import Theaters from './views/Theaters';
// import LoginSignup from './pages/LoginSignup'; // Combined login/sign up page

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Authentication Route */}
//         <Route path="/login" element={<LoginSignup />} />
        
//         {/* Dashboard Route as default */}
//         <Route path="/" element={<AdminDashboard />} />
        
//         {/* Other Navigation Routes */}
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/theaters" element={<Theaters />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import UserHome from './pages/UserHome';
import LoginSignup from './pages/LoginSignup';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Guest home page as default */}
          <Route path="/" element={<UserHome />} />
          {/* Combined login/sign up page */}
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

