import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import {Movie} from '../../models/movie';
import {MovieService} from '../../services/movies-service/movie.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  myForm: FormGroup;
  imageSrc: string;
  form = [];
  namePattern = '^[ a-zA-Zא-ת1-9]+$';
  directorPattern = '^[ a-zA-Zא-ת]+$';

  constructor(private fb: FormBuilder, private movieService: MovieService, private router:Router) { }

  ngOnInit() {

    this.myForm=this.fb.group({
      title:['',[Validators.required,Validators.minLength(2),Validators.pattern(this.namePattern)]],
      director:['',[Validators.required,Validators.minLength(2),Validators.pattern(this.directorPattern)]],
      description:['',[Validators.required,Validators.minLength(2),Validators.pattern(this.namePattern)]],
      releaseYear:['',[Validators.required,Validators.minLength(4)]],
      length:['', [Validators.required,Validators.maxLength(3)]],
      imageUrl:['',[Validators.required]]
    });

    this.form=this.movieService.form;
    
  }

  onSubmit() {
    console.log(this.myForm);
    this.movieService.addMovie(this.myForm).subscribe(
      (data)=>console.log(data),
      (error)=>console.log(error),
      ()=>{
        console.log('complete add movie to DB');
        this.router.navigate(['/']);
      }
      
    );
    }
  

}
