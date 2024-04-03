import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Genre, Movie, MoviesDto } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { TvshowsService } from '../../services/tvshows.service';
import { maptoMoviesDto } from '../../models/tvshows';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  shows$: Observable<MoviesDto> | null = null;
  genreId = '';
  type: 'movie' | 'tv' = 'movie';
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private TvShowService: TvshowsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      if (data['type'] === 'movie') {
        this.type = data['type'];
        this.genres$ = this.movieService.getMoviesGenre();

        this.genreId = data['genreId'];
        this.shows$ = this.movieService.getMoviesByGenre(this.genreId);
      }
      if (data['type'] === 'tv') {
        this.type = data['type'];
        this.genres$ = this.TvShowService.getTvShowsGenre();

        this.genreId = data['genreId'];
        this.shows$ = this.TvShowService.getTvShowsByGenre(this.genreId).pipe(
          map(maptoMoviesDto)
        );
      }
    });
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    if (this.type === 'movie') {
      this.shows$ = this.movieService.getMoviesByGenre(
        this.genreId,
        pageNumber
      );
    }
    if (this.type === 'tv') {
      this.shows$ = this.TvShowService.getTvShowsByGenre(
        this.genreId,
        pageNumber
      ).pipe(map(maptoMoviesDto));
    }
  }
}
