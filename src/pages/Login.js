import React, { useState } from "react";
//import axios from "axios";
import "../styles/Auth.css"; 
import api from "../api";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      const user = res.data.user;
      // Save user info 
       localStorage.setItem("userId", user.id);
         localStorage.setItem("userName", user.name);
         localStorage.setItem("userRole", user.role); //save role 
         // Show personalized welcome
      alert(`Welcome back, ${user.name}!`);

// Redirect based on role
 if (user.role === "admin") {
 window.location.href = "/adminDashboard"; 
} 
else{
  window.location.href = "/coffeeMenu"; // or "/cart" if you prefer }
   }

 } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
