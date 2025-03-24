import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Register from './Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (<>

  
      <Navbar/>
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
        </Routes>
     
   <Footer/>
  
    </>
  )
}

export default App
