// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useState } from 'react';
// // import { Link } from "react-router-dom";
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Register = () => {
// //     const [name, setName] = useState();
// //     const [email, setEmail] = useState();
// //     const [password, setPassword] = useState();
// //     const navigate = useNavigate();

// //     const handleSubmit = (event) => {
// //         event.preventDefault();
        
// //         axios.post('http://localhost:3001/register', { name, email, password })

// //         .then(result => {
// //             console.log(result);
// //             if(result.data === "Already registered"){
// //                 alert("E-mail already registered! Please Login to proceed.");
// //                 navigate('/login');
// //             }
// //             else{
// //                 alert("Registered successfully! Please Login to proceed.")
// //                 navigate('/login');
// //             }
            
// //         })
// //         .catch(err => console.log(err));
// //     }


// //     return (
// //         <div>
// //             <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
// //                 <div className="bg-white p-3 rounded" style={{width : '40%'}}>
// //                     <h2 className='mb-3 text-primary'>Register</h2>
// //                     <form onSubmit={handleSubmit}>
// //                         <div className="mb-3 text-start">
// //                             <label htmlFor="exampleInputEmail1" className="form-label">
// //                                 <strong >Name</strong>
// //                             </label>
// //                             <input 
// //                                 type="text"
// //                                 placeholder="Enter Name"
// //                                 className="form-control" 
// //                                 id="exampleInputname" 
// //                                 onChange={(event) => setName(event.target.value)}
// //                                 required
// //                             /> 
// //                         </div>
// //                         <div className="mb-3 text-start">
// //                             <label htmlFor="exampleInputEmail1" className="form-label">
// //                                 <strong>Email Id</strong>
// //                             </label>
// //                             <input 
// //                                 type="email" 
// //                                 placeholder="Enter Email"
// //                                 className="form-control" 
// //                                 id="exampleInputEmail1" 
// //                                 onChange={(event) => setEmail(event.target.value)}
// //                                 required
// //                             /> 
// //                         </div>
// //                         <div className="mb-3 text-start">
// //                             <label htmlFor="exampleInputPassword1" className="form-label">
// //                                 <strong>Password</strong>
// //                             </label>
// //                             <input 
// //                                 type="password" 
// //                                 placeholder="Enter Password"
// //                                 className="form-control" 
// //                                 id="exampleInputPassword1" 
// //                                 onChange={(event) => setPassword(event.target.value)}
// //                                 required
// //                             />
// //                         </div>
// //                         <button type="submit" className="btn btn-primary">Register</button>
// //                     </form>

// //                     <p className='container my-2'>Already have an account ?</p>
// //                     <Link to='/login' className="btn btn-secondary">Login</Link>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Registerimport { useState } from 'react';import React, { useState } from 'react';
// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const registerWithGoogle = () => {
//         window.open("http://localhost:6005/auth/google", "_self");
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:6005/register", { name, email, password });

//             if (response.status === 201) {
//                 alert("Registered successfully! Please log in.");
//                 navigate("/login");
//             }
//         } catch (error) {
//             console.error("🚨 Registration error:", error.response?.data);
//             alert(error.response?.data?.message || "An unknown error occurred");
//         }
//     };

//     return (
//         <div>
//             <h1>Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Register</button>
//             </form>
//             <button onClick={registerWithGoogle}>Sign Up with Google</button>
//             <p>Already have an account? <Link to="/login">Login</Link></p>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerWithGoogle = () => {
        window.open("http://localhost:6005/auth/google", "_self");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:6005/register", { name, email, password });
            if (response.status === 201) {
                alert("Registered successfully! Please log in.");
                navigate("/login");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An unknown error occurred");
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <p>Create an account to access the platform</p>
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="register-btn">Register</button>
            </form>
            <button className="google-register-btn" onClick={registerWithGoogle}>
                Sign up with Google
            </button>
            <p>Already have an account? <Link to="/login" className="login-link">Login!</Link></p>
        </div>
    );
};

export default Register;
