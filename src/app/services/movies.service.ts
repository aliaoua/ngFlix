import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenresDto, Movie, MoviesDto } from '../models/movie';
import { map } from 'rxjs';
import { VideoDto } from '../models/video';
import { ImageDto } from '../models/image';
import { CreditsDto } from '../models/credits';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '5e56b3482651714088c753ab4e52255a';
  getMoviesByType(type: string, count: number = 20) {
    return this.http
      .get<MoviesDto>(`${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }
  getMovieById(id: string) {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }
  getMoviesVideos(id: string) {
    return this.http
      .get<VideoDto>(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results));
  }
  getMovieImage(id: string) {
    return this.http
      .get<ImageDto>(`${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops));
  }
  getMoviesCredits(id: string) {
    return this.http
      .get<CreditsDto>(
        `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast));
  }

  getSimilarMovies(id: string) {
    return this.http
      .get<MoviesDto>(
        `${this.apiUrl}/movie/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results));
  }
  searchmovies(page: number, searchValue?: string) {
    const uri = searchValue ? `search/movie` : `movie/popular`;
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
    );
  }
  getMoviesGenre() {
    return this.http
      .get<GenresDto>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(map((data) => data.genres));
  }
  getMoviesByGenre(genresId: string, pageNumber: number = 1) {
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/discover/movie?with_genres=${genresId}&page=${pageNumber}&api_key=${this.apiKey}`
    );
  }
}
