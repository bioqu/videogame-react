import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Obtener lista de juegos con filtros
export const getGames = async (
  filters: {
    genre?: string;
    platform?: string;
    year?: string;
    tag?: string;
    developer?: string;
  } = {}
) => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      ordering: "-metacritic",
      page_size: "40",
      ...(filters.genre && { genres: filters.genre }),
      ...(filters.platform && { platforms: filters.platform }),
      ...(filters.year && { dates: `${filters.year}-01-01,${filters.year}-12-31` }),  // Corregir aquí
      ...(filters.tag && { tags: filters.tag }),
      ...(filters.developer && { developers: filters.developer }),
    });

    console.log("Parámetros de la API:", params.toString()); // Agregar esta línea

    const response = await axios.get(`${BASE_URL}/games?${params.toString()}`);

    return response.data.results;
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    return [];
  }
};

// Obtener detalles de un juego
export const getGameDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del juego:", error);
    return null;
  }
};

// Obtener lista de tags
export const getTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tags?key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener los tags:", error);
    return [];
  }
};

// Obtener lista de desarrolladores
export const getDevelopers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/developers?key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener los developers:", error);
    return [];
  }
};
