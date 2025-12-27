import "../styles/Contact.css";
import axios from "axios"; 
import React, { useState, useEffect } from "react";

function Contact() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 
  const [status, setStatus] = useState("");

// Clear status after 5 seconds 
useEffect(() => { 
if (status) { 
const timer = setTimeout(() => setStatus(""), 5000);
 return () => clearTimeout(timer);
 }
 }, [status]);


  // Add a submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in before sending a message.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/contact", {
        user_id: userId,
        name,
        email,
        message,
      });
      setStatus(res.data.message); // "We appreciate your message!..."
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Get in Touch ☕</h1>

        {/* Contact Info */}
        <div className="contact-info">
          <p><strong>Address:</strong> Main Street, Chtoura, Lebanon</p>
          <p><strong>Phone:</strong> +961 70 123 456</p>
          <p><strong>Email:</strong> hello@cafesavore.com</p>
        </div>

        {/* Social Links */}
        <ul className="contact-social">
          <li>Instagram: @CafeSavore</li>
          <li>Facebook: Cafe Savore</li>
          <li>Twitter: @CafeSavore</li>
        </ul>

        {/* Contact Form */}
        {/* Add onSubmit and bind inputs to state */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Decorative beans */}
          <span className="bean1"></span>
          <span className="bean2"></span>
          <span className="bean3"></span>

          <div className="form-field">
            <label htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Your Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              rows="5" 
              placeholder="Write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">Send Message</button>
        </form>

 {/* Toast-style popup */}
        {status && (
          <div className="toast">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
