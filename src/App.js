import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home";
import CoffeeMenu from "./pages/CoffeeMenu";
import About from "./pages/About"; // optional
import Contact from "./pages/Contact"; // optional
import img16 from "./assets/img16.jpg";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<CoffeeMenu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    
  );
}
export default App;