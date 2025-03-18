import { useEffect, useState } from "react";
import axios from "axios";
import { Game } from "../types/types";
import NoImagen from "../assets/NoImagen.png"; // Importar la imagen local
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "../App.css"; // Importa el archivo CSS

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Estado para la página actual

  useEffect(() => {
    const fetchGames = async () => {
      const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page=${page}` // Usar el parámetro page
        );
        setGames(response.data.results);
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
    <div style={{ paddingTop: "60px" }}>
      <h1>Juegos mejor valorados</h1>
      <br></br>
      {/* Cuadrícula de Bootstrap */}
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {games.map((game) => (
            <div className="col" key={game.id}>
              <Link
                to={`/game/${game.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 game-card">
                  {" "}
                  {/* Clases de Bootstrap + clase personalizada */}
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
          ))}
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
