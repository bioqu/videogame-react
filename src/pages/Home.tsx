import { useEffect, useState } from "react";
import axios from "axios";
import { Game } from "../types/types";
import NoImagen from "../assets/NoImagen.png"; // Importar la imagen local
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "../App.css"; // Importa el archivo CSS
import { useTheme } from "../context/theme-context"; // Ajusta la ruta según tu estructura
import {
  getGames,
  getPlatforms,
  getTags,
  getDevelopers,
} from "../services/rawApi";

interface HomeProps {
  filteredGames: Game[];
  setFilteredGames: (games: Game[]) => void;
}

const Home = ({ filteredGames, setFilteredGames }: HomeProps) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    genre: "",
    platform: "",
    year: "",
    tag: "",
    developer: "",
  });
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [developers, setDevelopers] = useState<string[]>([]);

  // Obtener listas de plataformas, tags y desarrolladores
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const platformList = await getPlatforms();
        const tagList = await getTags();
        const developerList = await getDevelopers();

        setPlatforms(platformList.map((platform) => platform.name));
        setTags(tagList.map((tag) => tag.name));
        setDevelopers(developerList.map((developer) => developer.name));
      } catch (error) {
        console.error("Error al obtener los filtros:", error);
      }
    };

    fetchFilters();
  }, []);

  // Función para aplicar los filtros
  const applyFilters = async () => {
    setLoading(true);
    try {
      const filteredResults = await getGames(filters);
      setFilteredGames(filteredResults); // Actualizar filteredGames
      setPage(1); // Reiniciar la paginación
    } catch (error) {
      console.error("Error al filtrar juegos:", error);
      setError("Error al aplicar los filtros.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Generar opciones de año dinámicamente
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1980; // Año inicial
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years;
  };

  const yearOptions = generateYearOptions();

  // Obtener juegos al cambiar la página
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page=${page}`
        );
        setFilteredGames(response.data.results); // Actualizar filteredGames
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
  }, [page]);

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
      <div className="container text-center">
        <div className="row row-cols-auto">
          <div className="col">
            <h1 className="d-inline me-3">Juegos</h1>
          </div>
          {/* Controles de filtrado */}
          <div className="col">
            {/* Filtro de género */}
            <select
              name="genre"
              onChange={handleFilterChange}
              value={filters.genre}
              className="form-select"
            >
              <option value="">Género</option>
              <option value="Action">Acción</option>
              <option value="Adventure">Aventura</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Estrategia</option>
              <option value="Shooter">Tiros</option>
            </select>
          </div>
          {/* Filtro de plataforma */}
          <div className="col">
            <select
              name="platform"
              onChange={handleFilterChange}
              value={filters.platform}
              className="form-select"
            >
              <option value="">Plataforma</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
          {/* Filtro de año */}
          <div className="col">
            <select
              name="year"
              onChange={handleFilterChange}
              value={filters.year}
              className="form-select"
            >
              <option value="">Año</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            {/* Filtro de tag */}
            <select
              name="tag"
              onChange={handleFilterChange}
              value={filters.tag}
              className="form-select"
            >
              <option value="">Tag</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          {/* Filtro de desarrollador */}
          <div className="col">
            <select
              name="developer"
              onChange={handleFilterChange}
              value={filters.developer}
              className="form-select"
            >
              <option value="">Desarrollador</option>
              {developers.map((developer) => (
                <option key={developer} value={developer}>
                  {developer}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            {/* Botón de aplicar filtros */}
            <button onClick={applyFilters} className="btn btn-primary">
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de juegos */}
      <div className="container text-center" style={{ paddingTop: "20px" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
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
