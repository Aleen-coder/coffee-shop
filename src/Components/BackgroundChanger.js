import React, { useState, useEffect } from "react";
import "../styles/BackgroundChanger.css";

function BackgroundChanger({ images, interval = 8000, children }) {
  const [bg, setBg] = useState(images[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBg(images[Math.floor(Math.random() * images.length)]);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div
      className="background-changer"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  );
}

export default BackgroundChanger;
