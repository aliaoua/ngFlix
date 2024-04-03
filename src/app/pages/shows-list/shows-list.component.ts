import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Observable, map } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Movie, MoviesDto } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from '../../services/tvshows.service';
import { maptoMoviesDto } from '../../models/tvshows';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent implements OnInit {
  showsList$: Observable<MoviesDto> | null = null;
  searchValue = '';
  showType: 'movie' | 'tv' = 'movie';
  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private tvShowService: TvshowsService
  ) {}

  ngOnInit(): void {
    // this.showType = this.activatedRoute.snapshot.params?.['type'];
    this.activatedRoute.params.subscribe((type) => {
      this.showType = type['type'];
      this.getPagedShows(this.showType, 1);
    });
  }

  getPagedShows(type: 'movie' | 'tv', page: number, searchKeyword?: string) {
    if (this.showType === 'movie') {
      this.showsList$ = this.moviesService.searchmovies(page, searchKeyword);
    }
    if (this.showType === 'tv') {
      this.showsList$ = this.tvShowService
        .searchTvShows(page, searchKeyword)
        .pipe(map(maptoMoviesDto));
    }
  }

  searchChanged() {
    this.getPagedShows(this.showType, 1, this.searchValue);
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getPagedShows(this.showType, pageNumber, this.searchValue);
  }
}
