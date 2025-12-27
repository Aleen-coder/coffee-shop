import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {

      const res = await api.post("/register", { name, email, password });
// Save user info
 localStorage.setItem("userId", res.data.userId);// backend returns userId
 localStorage.setItem("userRole", "customer"); // default role
 localStorage.setItem("userName", name); 

 // Personalized welcome story
alert(`Welcome aboard, ${name}! 🎉 You’ve registered successfully. Your journey with our coffee shop starts now — enjoy exploring, adding to your cart, and making it yours!`); 

// Redirect new users to menu
 window.location.href = "/coffeeMenu";
    }catch (err) { 
      alert(err.response?.data?.error || "Error registering user");

 } 

};
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-field">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="auth-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
