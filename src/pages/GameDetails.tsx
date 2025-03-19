import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../services/rawApi";
import { Game } from "../types/types";
import NoImagen from "../assets/NoImagen.png";
import "../App.css"; // Estilos adicionales adicionales;
import { useTheme } from "../context/theme-context"; // Tema oscuro/claro

const GameDetails = () => {
  const { theme, toggleTheme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (id) {
        try {
          const data = await getGameDetails(id);
          setGame(data);
        } catch (error) {
          console.error("Error al obtener detalles del juego", error);
          setError("No se pudieron cargar los detalles del juego.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchGame();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-5" style={{ paddingTop: "60px" }}>
        Cargando...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-5" style={{ paddingTop: "60px" }}>
        {error}
      </p>
    );
  if (!game) return null;

  return (
    <div
      className="container mt-5"
      style={{
        paddingTop: "100px",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
      }}
    >
      <div className="row">
        <div className="col-md-6">
          <img
            src={game.background_image || NoImagen}
            alt={game.name}
            className="img-fluid game-image-details"
          />
        </div>
        <div className="col-md-6">
          <h1 className="game-title">{game.name}</h1>
          <p className="game-meta">
            <strong>Puntuación:</strong> {game.metacritic || "N/A"}
          </p>
          <p>
            <strong>Lanzamiento:</strong> {game.released || "Desconocido"}
          </p>
          <p>
            <strong>Géneros:</strong>{" "}
            {game.genres?.map((g: { name: any }) => g.name).join(", ")}
          </p>
          <p
            className="game-description"
            dangerouslySetInnerHTML={{
              __html: game.description || "Descripción no disponible",
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
