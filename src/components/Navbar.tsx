import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { useTheme } from "../context/theme-context"; // Importar el hook del tema
import { getGames } from "../services/rawApi"; // Importar la función para obtener juegos

const Navbar = ({ onSearch, onFilter, tags, developers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, toggleTheme } = useTheme(); // Obtener el tema y la función para cambiarlo
  const [filters, setFilters] = useState({
    genre: "",
    platform: "",
    year: "",
    tag: "",
    developer: "",
  });

  // Función para manejar la búsqueda
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const games = await getGames();
      const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onSearch(filteredGames); // Pasar los resultados al componente padre
    } catch (error) {
      console.error("Error al buscar juegos:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  // Función para manejar el filtrado
  const handleFilter = async (filter: string, value: string) => {
    try {
      const filters: {
        genre?: string;
        platform?: string;
        year?: string;
        tag?: string;
        developer?: string;
      } = {};

      if (filter === "genre") {
        filters.genre = value;
      } else if (filter === "platform") {
        filters.platform = value;
      } else if (filter === "year") {
        filters.year = value;
      } else if (filter === "tag") {
        filters.tag = value;
      } else if (filter === "developer") {
        filters.developer = value;
      }

      const games = await getGames(filters); // Pasar el objeto de filtros
      onFilter(games);
    } catch (error) {
      console.error("Error al filtrar juegos:", error);
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: theme === "light" ? "#f8f9fa" : "#212529", // Fondo claro/oscuro
        color: theme === "light" ? "#000" : "#fff", // Texto claro/oscuro
      }}
    >
      <div className="container-sm">
        <a className="navbar-brand text-primary" href="/">
          Inicio
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex w-100" role="search" onSubmit={handleSearch}>
            <input
              className="form-control flex-grow-1 me-2"
              type="search"
              placeholder="Buscar juegos"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
          {/* Menú desplegable para géneros */}
          <div className="dropdown ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Géneros
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "action")}
                >
                  Acción
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "adventure")}
                >
                  Aventura
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "rpg")}
                >
                  RPG
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "strategy")}
                >
                  Estrategia
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "shooter")}
                >
                  Disparos
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "puzzle")}
                >
                  Puzzle
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "racing")}
                >
                  Carreras
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "sports")}
                >
                  Deportes
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "fighting")}
                >
                  Lucha
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("genre", "indie")}
                >
                  Indie
                </a>
              </li>
            </ul>
          </div>
          {/* Menú desplegable para plataformas */}
          <div className="dropdown ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Plataformas
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("platform", "pc")}
                >
                  PC
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("platform", "playstation")}
                >
                  PlayStation
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("platform", "xbox")}
                >
                  Xbox
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleFilter("platform", "nintendo switch")}
                >
                  Nintendo Switch
                </a>
              </li>
            </ul>
          </div>
          {/* Menú desplegable para años */}
          <div className="dropdown ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Año
            </button>
            <ul className="dropdown-menu">
              {Array.from(
                { length: 50 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <li key={year}>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleFilter("year", year.toString())}
                  >
                    {year}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menú desplegable para tags */}
          <div className="dropdown ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Tags
            </button>
            <ul className="dropdown-menu">
              {tags &&
                tags.map((tag) => (
                  <li key={tag}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleFilter("tag", tag)}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Menú desplegable para desarrolladores */}
          <div className="dropdown ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Desarrolladores
            </button>
            <ul className="dropdown-menu">
              {developers &&
                developers.map((developer) => (
                  <li key={developer}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleFilter("developer", developer)}
                    >
                      {developer}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          {/* Botón de cambio de tema */}
          <div className="form-check form-switch ms-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="themeToggle"
              checked={theme === "dark"} // Cambiar el estado del toggle según el tema
              onChange={toggleTheme} // Cambiar el tema al hacer clic
            />
            <label
              className={`form-check-label ${
                theme === "light" ? "text-dark" : "text-light"
              }`}
              htmlFor="themeToggle"
            >
              <p className="text-primary"> Modo Oscuro </p>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
