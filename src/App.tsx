import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ThemeProvider } from "./context/theme-context";
import React, { useState } from "react";
import { Game } from "./types/types";

function App() {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const handleSearch = (results: Game[]) => {
    setFilteredGames(results);
    setPage(1);
  };

  return (
    <ThemeProvider>
      <Router>
        {/* Navbar con la función de búsqueda */}
        <Navbar onSearch={handleSearch} />

        {/* Rutas */}
        <div>
          <Routes>
            {/* Ruta principal: Home */}
            <Route
              path="/"
              element={
                <Home
                  filteredGames={filteredGames}
                  setFilteredGames={setFilteredGames}
                />
              }
            />

            {/* Ruta para detalles del juego */}
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
function setPage(arg0: number) {
  throw new Error("Function not implemented.");
}
