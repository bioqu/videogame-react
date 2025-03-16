import { useEffect, useState } from "react";
import axios from "axios";

interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
}

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
    axios
      .get(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic`)
      .then((res) => setGames(res.data.results))
      .catch((error) => console.error("Error al obtener juegos", error));
  }, []);

  return (
    <div>
      <h1>Juegos mejor valorados</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <h3>{game.name}</h3>
            <p>Puntuación: {game.metacritic}</p>
            <img src={game.background_image} alt={game.name} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
