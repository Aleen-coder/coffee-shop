import React, { useState, useEffect } from "react";
import "../styles/BackgroundChanger.css";

function BackgroundChanger({ images, interval = 8000, children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div
      className="background-changer"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      {children}
    </div>
  );
}

export default BackgroundChanger;
