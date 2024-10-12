import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [isGuest, setIsGuest] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gamesPlaying, setGamesPlaying] = useState([]);
  const [gamesToPlay, setGamesToPlay] = useState([]);
  const navigate = useNavigate();

  // Función para eliminar un juego de una categoría
  const removeGame = (gameTitle, category) => {
    const updatedGames = JSON.parse(localStorage.getItem(category)).filter(
      (game) => game.title !== gameTitle
    );
    localStorage.setItem(category, JSON.stringify(updatedGames));

    // Actualizar el estado
    if (category === "gamesPlayed") setGamesPlayed(updatedGames);
    if (category === "gamesPlaying") setGamesPlaying(updatedGames);
    if (category === "gamesToPlay") setGamesToPlay(updatedGames);
  };

  // Función para mover un juego a otra categoría
  const moveGameToCategory = (game, currentCategory, targetCategory) => {
    // Eliminar el juego de la categoría actual
    removeGame(game.title, currentCategory);

    // Obtener juegos de la categoría destino y verificar duplicados
    const targetGames = JSON.parse(localStorage.getItem(targetCategory)) || [];
    if (targetGames.some((g) => g.title === game.title)) {
      alert("El juego ya está en esta categoría");
      return;
    }

    // Agregar el juego a la nueva categoría
    localStorage.setItem(
      targetCategory,
      JSON.stringify([...targetGames, game])
    );

    // Actualizar el estado en función de la categoría destino
    if (targetCategory === "gamesPlayed")
      setGamesPlayed([...gamesPlayed, game]);
    if (targetCategory === "gamesPlaying")
      setGamesPlaying([...gamesPlaying, game]);
    if (targetCategory === "gamesToPlay")
      setGamesToPlay([...gamesToPlay, game]);
  };
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
          <button onClick={() => navigate("/addgame")}>Agregar un juego</button>
          <div className="dashboard-columns">
            {/* Columna de Juegos Jugados */}
            <div className="column">
              <h2>Jugados</h2>
              {gamesPlayed.length > 0 ? (
                gamesPlayed.map((game) => (
                  <div key={game.title} className="game-card">
                    <img src={game.imageUrl} alt={game.title} />
                    <h4>{game.title}</h4>
                    <button
                      onClick={() => removeGame(game.title, "gamesPlayed")}
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() =>
                        moveGameToCategory(game, "gamesPlayed", "gamesPlaying")
                      }
                    >
                      Mover a Jugando
                    </button>
                    <button
                      onClick={() =>
                        moveGameToCategory(game, "gamesPlayed", "gamesToPlay")
                      }
                    >
                      Mover a Por Jugar
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay juegos jugados</p>
              )}
            </div>

            {/* Columna de Jugando */}
            <div className="column">
              <h2>Jugando</h2>
              {gamesPlaying.length > 0 ? (
                gamesPlaying.map((game) => (
                  <div key={game.title} className="game-card">
                    <img src={game.imageUrl} alt={game.title} />
                    <h4>{game.title}</h4>
                    <button
                      onClick={() => removeGame(game.title, "gamesPlaying")}
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() =>
                        moveGameToCategory(game, "gamesPlaying", "gamesPlayed")
                      }
                    >
                      Mover a Jugados
                    </button>
                    <button
                      onClick={() =>
                        moveGameToCategory(game, "gamesPlaying", "gamesToPlay")
                      }
                    >
                      Mover a Por Jugar
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay juegos jugando</p>
              )}
            </div>

            {/* Columna de Por Jugar */}
            <div className="column">
              <h2>Por Jugar</h2>
              {gamesToPlay.length > 0 ? (
                gamesToPlay.map((game) => (
                  <div key={game.title} className="game-card">
                    <img src={game.imageUrl} alt={game.title} />
                    <h4>{game.title}</h4>
                    <button
                      onClick={() => removeGame(game.title, "gamesToPlay")}
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() =>
                        moveGameToCategory(game, "gamesToPlay", "gamesPlayed")
                      }
                    >
                      Mover a Jugados
                    </button>
                    <button
                      onClick={() =>
                        moveGameToCategory(game, "gamesToPlay", "gamesPlaying")
                      }
                    >
                      Mover a Jugando
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay juegos por jugar</p>
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
