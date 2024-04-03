import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { imagesBaseURL } from '../../constants/images-sizes';
import { Movie } from '../../models/movie';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input() slides: Movie[] = [];
  @Input() isHeader = false;
  constructor() {}
  imagesBaseURL = imagesBaseURL;

  slideIndex = 0;
  ngOnInit() {
    if (!this.isHeader) this.changeSlide();
  }
  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) this.slideIndex = 0;
    }, 5000);
  }
}
