import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "10px",
        background: "#282c34",
        color: "white",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Inicio
      </Link>
      <Link to="/favorites" style={{ color: "white", textDecoration: "none" }}>
        Favoritos
      </Link>
    </nav>
  );
};

export default Navbar;
