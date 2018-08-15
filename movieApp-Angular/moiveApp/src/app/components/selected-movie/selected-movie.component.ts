import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {Movie} from '../../models/movie';
import {MovieService} from '../../services/movies-service/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selected-movie',
  templateUrl: './selected-movie.component.html',
  styleUrls: ['./selected-movie.component.css']
})
export class SelectedMovieComponent implements OnInit {
  
  movie={};
   title;
  constructor(private route:ActivatedRoute,private router:Router,private movieService:MovieService) { }

  ngOnInit() {
    this.title=this.route.snapshot.params['title'];
    this.movieService.getMovieDetails(this.title).subscribe((data)=>{
      this.movie=data;
    
    });

  }

  // go to update movie form component
updateMovie(){
  this.router.navigate(['movies/'+this.title  +'/edit']);
}

// first complete the delete process and then route to main page
deleteMovie(){
  this.movieService.deleteMovie(this.title).subscribe((data) =>{
    console.log(data);
    
  },(err)=>{
    console.log(err)
  },()=>{
    console.log('completed');
     this.router.navigate(['/'])
  });
 
}

}
