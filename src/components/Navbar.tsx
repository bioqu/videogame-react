import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-sm">
        <a className="navbar-brand text-primary" href="#">
          Home
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
