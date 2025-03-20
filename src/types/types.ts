export interface Game {
  id: number;
  name: string;
  genres: { name: string }[]; // Géneros del juego
  background_image: string; // URL de la imagen de fondo
  description: string; // Descripción del juego
  released: string; // Fecha de lanzamiento
  metacritic: number; // Puntuación de Metacritic
  tags: { name: string }[]; // Tags del juego
  developers: { name: string }[]; // Desarrolladores del juego
}