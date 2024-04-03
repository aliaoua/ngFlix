import { Component, Input } from '@angular/core';

import { Movie } from '../../models/movie';
// import { Tvshows } from '../../models/tvshows';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() title = '';
  @Input() shows: Movie[] = [];
  @Input() type: 'movie' | 'tv' = 'movie';
}
