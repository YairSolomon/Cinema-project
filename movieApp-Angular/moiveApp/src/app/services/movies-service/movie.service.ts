import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { Hall } from '../../models/hall';

import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movieApiUrl = 'http://localhost:3000/movies';
  hallApiUrl = 'http://localhost:3000/halls';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  form = [
    {
      name: 'Title', formControl: 'title', type: 'text', max: 25, required: 'Please enter movie title',
      pattern: ' Movie title cannot include special chars (!@$?)',
      minlength: 'Movie title has to includes more than 2 chars'
    },
    {
      name: 'Director', formControl: 'director', type: 'text', max: 25, required: 'Please enter director name',
      pattern: 'Director name cannot include numbers or special chars (!@$?)', minlength: 'Director name has to includes more than 2 chars'
    },
    {
      name: 'Description', formControl: 'description', type: 'text', max: 1000, required: 'Please enter movie description',
      pattern: 'Description cannot include special chars (!@$?)'
    },
    {
      name: 'Realse Year', formControl: 'releaseYear', type: 'number', min: 4, max: 4, required: 'Please enter release year',
      minlength: 'Release year format example : 1998'
    },
    {
      name: 'length', formControl: 'length', type: 'number', min: 2, max: 3, required: 'Please enter movie length',
      minlength: 'movie length has to be at least 2 digits'
    },
    {
      name: 'Movie Image', formControl: 'imageUrl', type: 'text', required: 'Please enter movie image',
    }

  ];


  constructor(private http: HttpClient) { }


  // get all movies from DB
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieApiUrl);
  }

  // add new Movie to DB
  // can return any if the post return error
  addMovie(newMovie: FormGroup): Observable<any> {
    const formValues = JSON.stringify(newMovie.value);
    console.log(formValues);

    return this.http.post<Movie>(this.movieApiUrl, formValues, this.httpOptions);

  }

  //Update Movie in DB
  updateMovie(updatedMovie: FormGroup, title: string): Observable<any> {
    const formValues = JSON.stringify(updatedMovie.value);
    const updateMovieUrl = this.movieApiUrl + '/' + title + '/edit';

    return this.http.put<Movie>(updateMovieUrl, formValues, this.httpOptions);

  }

  //delete Movie from DB

  deleteMovie(movieTitle: String): Observable<any> {
    return this.http.delete(this.movieApiUrl + '/' + movieTitle);

  }

  // get movie details
  getMovieDetails(title: string): Observable<Movie> {

    let movieDetailUrl = 'http://localhost:3000/movies/' + title;
    console.log(movieDetailUrl);

    return this.http.get<Movie>(movieDetailUrl);
  }



  getAllHalls(): Observable<Hall[]> {

    return this.http.get<Hall[]>(this.hallApiUrl);
  }



}
