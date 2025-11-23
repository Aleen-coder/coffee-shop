import { Link } from "react-router-dom";
import img16 from "../assets/img16.jpg";
import  "../styles/NavBar.css";

function NavBar() {
  return (


    <nav className="navbar">

      <div className="navbar-container">
        
        {/* Logo on the left */}
        <Link to="/" className="navbar-logo">
          <img src={img16} alt="Logo" /> 
         <span class="logo-wrapper">
    <span class="logo-text">Cafe Savore</span>
     </span>

        </Link>

        {/* Navigation links centered */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/menu" className="navbar-link">Coffee Menu</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
   
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
