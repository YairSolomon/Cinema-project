import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movies-service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowsService } from '../../../services/shows-service/shows.service';
import { Observable } from 'rxjs';
import { Movie } from '../../../models/movie';
import { Show } from '../../../models/show';
import { OrdersService } from '../../../services/orders-service/orders.service';


@Component({
  selector: 'app-movie-order',
  templateUrl: './movie-order.component.html',
  styleUrls: ['./movie-order.component.css']
})
export class MovieOrderComponent implements OnInit {

  movie;
  title:string;
  shows:{};

  constructor(private route:ActivatedRoute,private router:Router,private movieService:MovieService,private showService:ShowsService) { }

  ngOnInit() {
    this.title=this.route.snapshot.params['title']
    this.movieService.getMovieDetails(this.title).subscribe((data)=>{
      this.movie=data;
    
    })

    this.showService.getShowByTitle(this.title).subscribe((data)=>{
      this.shows=data;
    })
    
  }

  chooseSeats(showId:string,hallNumber:string){
    
    this.router.navigate(['shows',hallNumber,showId,'seats'])
  }

}
