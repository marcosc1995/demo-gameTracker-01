import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

export default function Dashboard() {
  const [isGuest, setIsGuest] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gamesPlaying, setGamesPlaying] = useState([]);
  const [gamesToPlay, setGamesToPlay] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const guestStatus = localStorage.getItem("guest");
    if (guestStatus) {
      setIsGuest(true); // Establecer estado como invitado

      // Cargar juegos del localStorage
      const storedGamesPlayed =
        JSON.parse(localStorage.getItem("gamesPlayed")) || [];
      const storedGamesPlaying =
        JSON.parse(localStorage.getItem("gamesPlaying")) || [];
      const storedGamesToPlay =
        JSON.parse(localStorage.getItem("gamesToPlay")) || [];

      setGamesPlayed(storedGamesPlayed);
      setGamesPlaying(storedGamesPlaying);
      setGamesToPlay(storedGamesToPlay);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("guest"); // Eliminar estado de invitado
    navigate("/"); // Redirigir al home
  };
  return (
    <div>
      <h1>Dashboard</h1>
      {isGuest ? (
        <div>
          <h2>Estás navegando como invitado</h2>
          <button onClick={handleLogout}>Salir</button>
          <button onClick={()=> navigate('/addgame')}>Agregar un juego</button>
          <div className="dashboard-columns">
            {/* Columna de Juegos Jugados */}
            <div className="column">
              <h3>Juegos Jugados</h3>
              {gamesPlayed.length > 0 ? (
                gamesPlayed.map((game, index) => (
                  <div key={index} className="game-card">
                    <img src={game.imageUrl} alt={game.title} />
                    <h4>{game.title}</h4>
                  </div>
                ))
              ) : (
                <p>No hay juegos jugados.</p>
              )}
            </div>

            {/* Columna de Jugando */}
            <div className="column">
              <h3>Jugando</h3>
              {gamesPlaying.length > 0 ? (
                gamesPlaying.map((game, index) => (
                  <div key={index} className="game-card">
                    <img src={game.imageUrl} alt={game.title} />
                    <h4>{game.title}</h4>
                  </div>
                ))
              ) : (
                <p>No hay juegos en curso.</p>
              )}
            </div>

            {/* Columna de Por Jugar */}
            <div className="column">
              <h3>Por Jugar</h3>
              {gamesToPlay.length > 0 ? (
                gamesToPlay.map((game, index) => (
                  <div key={index} className="game-card">
                    <img src={game.imageUrl} alt={game.title} />
                    <h4>{game.title}</h4>
                  </div>
                ))
              ) : (
                <p>No hay juegos por jugar.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Bienvenido al Dashboard</h2>
          {/* Contenido para usuarios registrados */}
        </div>
      )}
    </div>
  );
}
