import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JQuery } from '../../node_modules/jquery/dist/jquery.min'



import { AppComponent } from './app.component';

//app components
import { MoviesComponent } from './components/movies/movies.component';
import { NewMovieComponent } from './components/new-movie/new-movie.component';
import { HeaderComponent } from './components/header/header.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { SelectedMovieComponent } from './components/selected-movie/selected-movie.component';
import { ShowSchduleComponent } from '../app/components/shows/show-schdule/show-schdule.component';
import { SceduleHallComponent } from '../app/components/shows/scedule-hall/scedule-hall.component';
import { ScheduleComponent } from '../app/components/shows/schedule.component';
import { HallsComponent } from './components/halls/halls.component';
import { SeatsHallComponent } from './components/seats-hall/seats-hall.component';
import { MovieOrderComponent } from './components/orders/movie-order/movie-order.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';

//app services
import { MovieService } from './services/movies-service/movie.service';
import { HallsService } from './services/hall-service/halls.service';
import { ShowsService } from './services/shows-service/shows.service';
import { OrdersService } from './services/orders-service/orders.service'


//app directive and pipes
import { appHideDirective } from './directives/appHide.directive';
import { appSelectDirective } from './directives/appSelect.directive';
import { OrderByPipe } from '../app/pipes/order-by.pipe';
import { EmailConfirmationDirective } from './directives/email-confirm/email-confirmation.directive';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';



const appRoutes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'order/:title', component: MovieOrderComponent },
  { path: 'add-movie', component: NewMovieComponent },
  { path: 'movies/:title', component: SelectedMovieComponent },
  { path: 'movies/:title/edit', component: EditMovieComponent },
  {
    path: 'shows', component: ScheduleComponent, children: [
      { path: ':number', component: SceduleHallComponent },
      {
        path: ':number/:showId/seats', component: SeatsHallComponent},
    ]
  },
  { path: ':showId/order', component: OrderDetailsComponent },
  { path: 'halls', component: HallsComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'seats', component: SeatsHallComponent },


];



@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    NewMovieComponent,
    HeaderComponent,
    EditMovieComponent,
    SelectedMovieComponent,
    ShowSchduleComponent,
    SceduleHallComponent,
    ScheduleComponent,
    HallsComponent,
    appHideDirective,
    appSelectDirective,
    OrderByPipe,
    SeatsHallComponent,
    MovieOrderComponent,
    OrderDetailsComponent,
    EmailConfirmationDirective,
    OrdersListComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(appRoutes),
  ],
  providers: [MovieService, HallsService, ShowsService, OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
