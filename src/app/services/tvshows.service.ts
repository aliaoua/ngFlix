import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { Tvshow, TvshowsDto } from '../models/tvshows';
import { CreditsDto } from '../models/credits';
import { VideoDto } from '../models/video';
import { ImageDto } from '../models/image';
import { GenresDto } from '../models/movie';
@Injectable()
export class TvshowsService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '5e56b3482651714088c753ab4e52255a';
  getTvShowsByType(type: string, count: number = 20) {
    return this.http
      .get<TvshowsDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)));
  }
  getTvShowById(id: string) {
    return this.http.get<Tvshow>(
      `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }
  getTvShowVideos(id: string) {
    return this.http
      .get<VideoDto>(`${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results));
  }
  getTvShowImage(id: string) {
    return this.http
      .get<ImageDto>(`${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops));
  }
  getTvShowCredits(id: string) {
    return this.http
      .get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.cast));
  }

  getSimilarTvShows(id: string) {
    return this.http
      .get<TvshowsDto>(`${this.apiUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results));
  }
  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? `search/tv` : `tv/popular`;
    return this.http.get<TvshowsDto>(
      `${this.apiUrl}/${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
    );
  }
  getTvShowsGenre() {
    return this.http
      .get<GenresDto>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(map((data) => data.genres));
  }
  getTvShowsByGenre(genresId: string, pageNumber: number = 1) {
    return this.http.get<TvshowsDto>(
      `${this.apiUrl}/discover/tv?with_genres=${genresId}&page=${pageNumber}&api_key=${this.apiKey}`
    );
  }
}
