import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { map } from 'rxjs';
import { mapToMovies } from '../../models/tvshows';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private movieService: MoviesService,
    private tvShowsService: TvshowsService
  ) {}
  upcomingMovies$ = this.movieService.getMoviesByType('upcoming', 12);
  popularMovies$ = this.movieService.getMoviesByType('popular', 12);
  topRatedMovies$ = this.movieService.getMoviesByType('top_rated', 12);
  popularTvshows$ = this.tvShowsService
    .getTvShowsByType('popular', 5)
    .pipe(map(mapToMovies));
}
