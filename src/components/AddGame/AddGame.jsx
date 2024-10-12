import React from "react";
import { useState } from "react";
import "./AddGame.css";
import { useNavigate } from "react-router-dom";

export default function AddGame() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Función para buscar juegos en la API usando fetch
  const searchGames = async (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
        "X-RapidAPI-Key": "6150e4d77bmsh04abafa6114ef03p1ce7e0jsncc8a1386169e",
      },
    };
    if (!query) return;
    //! RECORDAR NO DEJAR PUBLICA MI API KEY !!!!!!!
    try {
      const response = await fetch(
        `https://rawg-video-games-database.p.rapidapi.com/games?key=f62da0af1d41486894d3adad81cbd732&search=${query}&ordering=-metacritic&search_exact=true`,
        options
      );
      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      setResults(data.results);
      setError(null); // Limpiar errores en caso de éxito
    } catch (err) {
      setError("Hubo un problema con la búsqueda, intenta nuevamente.");
      setResults([]);
    }
  };

  // Función para guardar el juego en la categoría seleccionada
  const saveGameToCategory = (game, category) => {
    const storedGames = JSON.parse(localStorage.getItem(category)) || [];
    const newGame = {
      title: game.name,
      imageUrl: game.background_image, // O cualquier otra propiedad que obtengas de la API
    };

    // Guardar el juego en localStorage
    localStorage.setItem(category, JSON.stringify([...storedGames, newGame]));
    alert(`Juego agregado a la categoría: ${category}`);
    navigate("/dashboard");
  };
  return (
    <div>
      <h1>Agregar un Juego</h1>
      <form onSubmit={searchGames}>
        <input
          type="text"
          placeholder="Buscar juego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="results">
        {results.length > 0 ? (
          results.map((game) => (
            <div key={game.id} className="game-result">
              <img src={game.background_image} alt={game.name} />
              <h4>{game.name}</h4>
              <button onClick={() => saveGameToCategory(game, "gamesPlayed")}>
                Agregar a Jugados
              </button>
              <button onClick={() => saveGameToCategory(game, "gamesPlaying")}>
                Agregar a Jugando
              </button>
              <button onClick={() => saveGameToCategory(game, "gamesToPlay")}>
                Agregar a Por Jugar
              </button>
            </div>
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
    </div>
  );
}
