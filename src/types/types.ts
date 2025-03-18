// types.ts  para centralizar definiciones de game
export interface Game {
    id: number;
    name: string;
    genres: any[] | any;
    background_image: string;
    description: string; // Propiedad opcional
    released: string;
    metacritic: number;
  }