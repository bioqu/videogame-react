import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ThemeProvider } from "./context/theme-context";
import React, { useState, useEffect } from "react";
import { getGames, getTags, getDevelopers } from "./services/rawApi";

function App() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [tags, setTags] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gameList = await getGames();
        setGames(gameList);
        setFilteredGames(gameList); // Asegurar que filteredGames se actualice aquí
      } catch (error) {
        console.error("Error al obtener juegos:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const tagList = await getTags();
        setTags(tagList.map((tag) => tag.name));
      } catch (error) {
        console.error("Error al obtener tags:", error);
      }
    };

    const fetchDevelopers = async () => {
      try {
        const developerList = await getDevelopers();
        setDevelopers(developerList.map((developer) => developer.name));
      } catch (error) {
        console.error("Error al obtener desarrolladores:", error);
      }
    };

    fetchGames();
    fetchTags();
    fetchDevelopers();
  }, []);

  const handleSearch = (results) => {
    setFilteredGames(results);
    setPage(1);
  };

  const handleFilter = (results) => {
    setFilteredGames(results);
    setPage(1);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar
          onSearch={handleSearch}
          onFilter={handleFilter}
          tags={tags}
          developers={developers}
        />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  games={filteredGames}
                  setGames={setFilteredGames}
                  page={page}
                  setPage={setPage}
                />
              }
            />
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
