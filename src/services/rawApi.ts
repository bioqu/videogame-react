import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export const getGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    return [];
  }
};

export const getGameDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del juego:", error);
    return null;
  }
};
