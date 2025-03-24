// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
// const loginwithgoogle=()=>{
//     window.open("http://localhost:6005/auth/google/callback","_self")
// }

//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault(); // Prevent form from reloading
    
//         axios.post('http://localhost:3001/login', { email, password })

// // Ensure correct backend port
//             .then(result => {
//                 console.log("API Response:", result.data); // Debugging output
                
//                 // Corrected if condition
//                 if (result.data.message === "Success") { 
//                     console.log("Login Success");
//                     alert('Login successful!');
//                     navigate('/home');
//                 } else {
//                     alert('Incorrect password! Please try again.');
//                 }
//             })
//             .catch(err => console.error("Login error:", err)); // Catching errors
//     };
    

//     return (
//         <>
//         <div className="login-page">
//             <h1 style={{textAlign:"center"}}>Login</h1>
//             <div className="form">
//                 <form className='login-form'>
//                     <input type="text" name="" id="" placeholder='username' />
//                     <input type="password" name="" id="" placeholder='password'  />
//                     <button>Login</button>
//                     <p className='message'>Not Registerd? <a href="#">Create an account</a></p>
//                 </form>
//                 <button className='login-with-google-btn' onClick={loginwithgoogle}>
//                     Sign In With Google
//                 </button>
//             </div>
//         </div>
//     </>
//     )
// }

// export default Loginimport { useEffect, useState } from "react";
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         if (urlParams.get("error")) {
//             alert("Email already registered manually! Please log in using email & password.");
//             navigate("/login");
//         }
//     }, []);

//     const loginWithGoogle = () => {
//         window.open("http://localhost:6005/auth/google", "_self");
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:6005/login", { email, password });

//             if (response.data.message === "Success") {
//                 alert("Login successful!");
//                 navigate("/home");
//             } else {
//                 alert("User not registered! Redirecting to registration...");
//                 navigate("/register");
//             }
//         } catch (error) {
//             alert("Invalid credentials. Please try again!");
//         }
//     };

//     return (
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//             <button onClick={loginWithGoogle}>Sign in with Google</button>
//             <p>Not registered? <Link to="/register">Create an account</Link></p>
//         </div>
//     );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("error")) {
            alert("Email already registered manually! Please log in using email & password.");
            navigate("/login");
        }
    }, []);

    const loginWithGoogle = () => {
        window.open("http://localhost:6005/auth/google", "_self");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:6005/login", { email, password });

            if (response.data.message === "Success") {
                alert("Login successful!");
                navigate("/home");
            } else {
                alert("User not registered! Redirecting to registration...");
                navigate("/register");
            }
        } catch (error) {
            alert("Invalid credentials. Please try again!");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <p>Please enter your credentials to log in</p>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="login-btn">Login</button>
            </form>
            <button className="google-login-btn" onClick={loginWithGoogle}>
                Sign in with Google
            </button>
            <p>Not a member yet? <Link to="/register" className="register-link">Register!</Link></p>
        </div>
    );
};

export default Login;
