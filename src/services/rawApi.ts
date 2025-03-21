import axios from "axios";
import { Game } from "../types/types";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Obtener
export const getPlatforms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/platforms?key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener las plataformas:", error);
    return [];
  }
};

// Obtener lista de juegos con filtros
export const getGames = async (
  filters: {
    search?: string;
    genre?: string;
    platform?: string;
    year?: string;
    tag?: string;
    developer?: string;
  } = {}
): Promise<Game[]> => { // Especificar que devuelve un array de Game
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      ordering: "-metacritic",
      page_size: "40",
      ...(filters.search && { search: filters.search }), // 🔍 Buscar por nombre
      ...(filters.genre && { genres: filters.genre }),
      ...(filters.platform && { platforms: filters.platform }),
      ...(filters.year && { dates: `${filters.year}-01-01,${filters.year}-12-31` }),
      ...(filters.tag && { tags: filters.tag }),
      ...(filters.developer && { developers: filters.developer }),
    });

    console.log("Parámetros de la API:", params.toString());

    const response = await axios.get(`${BASE_URL}/games?${params.toString()}`);
    return response.data.results as Game[];
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
