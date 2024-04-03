import { Movie, MoviesDto } from './movie';

export interface Tvshow {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  name: string;
  first_air_date: string;
}

export interface TvshowsDto {
  page: number;
  results: Tvshow[];
  total_pages: number;
  total_results: number;
}
export function mapToMovies(tvshows: Tvshow[]): Movie[] {
  return tvshows.map((tvshow: Tvshow) => {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    };
  });
}
export function mapToMovie(tvshow: Tvshow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
  };
}
export function maptoMoviesDto(tvShow: TvshowsDto): MoviesDto {
  return {
    ...tvShow,
    results: tvShow.results.map(mapToMovie),
    total_pages: tvShow.total_pages,
    total_results: tvShow.total_results,
    page: tvShow.page,
  };
}
