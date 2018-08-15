import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movies-service/movie.service';
import {Movie} from '../../models/movie';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies:Observable<Movie[]>;
  constructor(private movieService:MovieService) {
  

   }

  ngOnInit() {
    this.movies=this.movieService.getAllMovies();


  }

}
