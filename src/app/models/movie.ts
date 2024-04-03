export interface Movie {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  revenue?: number;
  runtime?: string;
  status?: string;
  genres?: Genre[];
}
export interface MoviesDto {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface Genre {
  id: string;
  name: string;
}
export interface GenresDto {
  genres: Genre[];
}
export interface Genre {
  id: string;
  name: string;
}
