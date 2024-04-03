import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ImagesSizes } from '../../constants/images-sizes';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { Actor } from '../../models/credits';
import { Image } from '../../models/image';
import { Movie } from '../../models/movie';
import { mapToMovie, mapToMovies } from '../../models/tvshows';
import { Video } from '../../models/video';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {
  showId = '';
  showType: 'tv' | 'movie' = 'movie';

  show$: Observable<Movie> | null = null;
  showVideos$: Observable<Video[]> | null = null;
  showImages$: Observable<Image[]> | null = null;
  showCast$: Observable<Actor[]> | null = null;
  similarShows$: Observable<Movie[]> | null = null;

  imagesSizes = ImagesSizes;

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService,
    private tvService: TvshowsService
  ) {}

  ngOnInit() {
    this.showId = this.router.snapshot.params['id'];
    this.showType = this.router.snapshot.params['type'];

    if (this.showType === 'movie') {
      this.show$ = this.moviesService.getMovieById(this.showId);
      this.showVideos$ = this.moviesService.getMoviesVideos(this.showId);
      this.showImages$ = this.moviesService.getMovieImage(this.showId);
      this.showCast$ = this.moviesService.getMoviesCredits(this.showId);
      this.similarShows$ = this.moviesService.getSimilarMovies(this.showId);
    }
    if (this.showType === 'tv') {
      this.show$ = this.tvService
        .getTvShowById(this.showId)
        .pipe(map(mapToMovie));
      this.showVideos$ = this.tvService.getTvShowVideos(this.showId);
      this.showImages$ = this.tvService.getTvShowImage(this.showId);
      this.showCast$ = this.tvService.getTvShowCredits(this.showId);
      this.similarShows$ = this.tvService
        .getSimilarTvShows(this.showId)
        .pipe(map(mapToMovies));
    }
  }
}
