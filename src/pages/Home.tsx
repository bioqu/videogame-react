import { useEffect, useState } from "react";
import axios from "axios";
import { Game } from "../types/types";
import NoImagen from "../assets/NoImagen.png"; // Importar la imagen local
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "../App.css"; // Importa el archivo CSS
import { useTheme } from "../context/theme-context"; // Ajusta la ruta según tu estructura

interface HomeProps {
  games: Game[];
  setGames: (games: Game[]) => void;
  page: number;
  setPage: (page: number) => void;
}

const Home = ({ games, setGames, page, setPage }: HomeProps) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Estado para la página actual

  useEffect(() => {
    const fetchGames = async () => {
      const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page=${page}`
        );

        if (response.data.results && response.data.results.length > 0) {
          setGames(response.data.results);
        } else {
          setGames([]); // No hay juegos, limpiar el estado
          console.log("No se encontraron juegos para la página", page);
        }
      } catch (error) {
        console.error("Error al obtener juegos", error);
        setError(
          "No se pudieron cargar los juegos. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [page]); // Ejecutar efecto cuando cambie la página

  // Mensaje de carga de web
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

  return (
    <div
      style={{
        paddingTop: "100px",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
      }}
    >
      <h1 className="container">Juegos</h1>
      <br />
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {games.length > 0 ? (
            games.map((game) => (
              <div className="col" key={game.id}>
                <Link
                  to={`/game/${game.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 game-card">
                    <img
                      src={game.background_image || NoImagen}
                      alt={game.name}
                      className="game-image img-fluid mx-auto d-block"
                    />
                    <div className="card-body">
                      <h3 className="card-title">{game.name}</h3>
                      <p className="card-text">Puntuación: {game.metacritic}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No hay juegos disponibles.</p>
          )}
        </div>
      </div>
      {/* Botones de paginación */}
      <div className="d-flex justify-content-center gap-2 my-4">
        <button
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
