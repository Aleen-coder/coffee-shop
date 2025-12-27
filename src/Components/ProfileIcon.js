
import axios from "axios";
import "../styles/ProfileIcon.css"; // new CSS file
import React, { useState } from "react";

function ProfileIcon() {
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage"); 
const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      localStorage.clear();
      alert("You have been logged out and your account deleted.");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Could not delete account.");
    }
  };
  // Only render if user is logged in 
  if (!userId) return null;

  return (
    <div className="profile-wrapper">
      <div className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
        {userImage ? (
          <img src={userImage} alt="Profile" />
        ) : (
          <span>{userName?.charAt(0)}</span>
        )}
      </div>
     {isOpen && (
        <div className="profile-dropdown">
          <p className="profile-name">👋 {userName}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
