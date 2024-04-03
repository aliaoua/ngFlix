import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';
import { ShowsListComponent } from './pages/shows-list/shows-list.component';
import { GenresComponent } from './pages/genres/genres.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list/:type', component: ShowsListComponent },
  { path: 'detail/:id/:type', component: ShowDetailComponent },

  { path: 'list/movie/detail/:id/:type', component: ShowDetailComponent },
  { path: 'list/tv/detail/:id/:type', component: ShowDetailComponent },
  { path: 'genres/:type', component: GenresComponent },
  { path: 'genres/:type/:genreId', component: GenresComponent },
  { path: 'genres/:genreId/detail/:id/:type', component: ShowDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
