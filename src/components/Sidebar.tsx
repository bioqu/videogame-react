import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "200px",
        height: "100vh",
        background: "#333",
        color: "white",
        padding: "1rem",
      }}
    >
      <h2>Menú</h2>
      <ul>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            style={{ color: "white", textDecoration: "none" }}
          >
            Favoritos
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
