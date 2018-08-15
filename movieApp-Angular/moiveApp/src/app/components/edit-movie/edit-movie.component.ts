import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movies-service/movie.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  myForm: FormGroup;
  movie: Movie;
  title;
  form = [];
  namePattern = '^[ a-zA-Zא-ת1-9]+$';
  directorPattern = '^[ a-zA-Zא-ת]+$';
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit() {
    // get movie title from url

    this.movie = new Movie();
    this.title = this.route.snapshot.params['title'];

    this.movieService.getMovieDetails(this.title).subscribe(

      (data) => {
        this.movie = data;
        this.myForm.patchValue({
          title: this.movie.title,
          director: this.movie.director,
          description: this.movie.description,
          releaseYear: this.movie.releaseYear,
          length: this.movie.length,
          imageUrl: this.movie.imageUrl
        }
        )
      },
      (error) => console.log(error),
    );

    //editing movie form
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]],
      director: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.directorPattern)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]],
      releaseYear: ['', [Validators.required, Validators.minLength(4)]],
      length: ['', [Validators.required, Validators.maxLength(3)]],
      imageUrl: ['', [Validators.required]]
    });

    this.form = this.movieService.form;
  }

  //update the movie
  onSubmit() {
    this.movieService.updateMovie(this.myForm, this.title).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => {
        console.log('Movie update completed');
        this.router.navigate(['/']);
      }
    );

  }
}
