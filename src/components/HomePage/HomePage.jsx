import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [randomVideo, setRandomVideo] = useState("");

  const videoSources = [
    "./public/video-bg2.webm",
    "./public/video-bg.webm",
    "./public/video-bg3.webm",
  ];
  // Seleccionar un video aleatorio cuando se monte el componente
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    setRandomVideo(videoSources[randomIndex]);
  }, []);
  const navigate = useNavigate();
  const handleGuestLogin = () => {
    localStorage.setItem("guest", "true");
    navigate("/dashboard");
  };
  return (
    <div className="homepage">
      {/* // Video de fondo */}
      <video className="video-background" autoPlay loop muted>
        <source src="./public/video-bg2.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <h1>Welcome to Game Tracker</h1>
      <div className="button-container">
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={handleGuestLogin}>Enter as guest</button>
      </div>
    </div>
  );
}
