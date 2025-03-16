import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../services/rawApi";

interface Game {
  name: string;
  background_image: string;
  description: string;
  released: string;
  metacritic: number;
}

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (id) {
        const data = await getGameDetails(id);
        setGame(data);
      }
    };
    fetchGame();
  }, [id]);

  if (!game) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{game.name}</h1>
      <p>Puntuación: {game.metacritic}</p>
      <p>Lanzamiento: {game.released}</p>
      <img src={game.background_image} alt={game.name} width="400" />
      <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
    </div>
  );
};

export default GameDetails;
