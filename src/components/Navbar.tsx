import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { useTheme } from "../context/theme-context"; // Importar el hook del tema

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, toggleTheme } = useTheme(); // Obtener el tema y la función para cambiarlo

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
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
        <a className="navbar-brand text-primary" href="#">
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
          <div className="dropdown ms-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtrar Juegos
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Año
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Género
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Plataforma
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Tags
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Desarrolladora
                </a>
              </li>
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
