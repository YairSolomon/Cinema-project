import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../../services/movies-service/movie.service';
import {Movie} from '../../../models/movie';
import { Observable } from 'rxjs';
import { Hall } from '../../../models/hall';
import {FormControlName} from '@angular/forms'
import {Router} from '@angular/router'

@Component({
  selector: 'app-show-schdule',
  templateUrl: './show-schdule.component.html',
  styleUrls: ['./show-schdule.component.css']
})
export class ShowSchduleComponent implements OnInit {
  hallNumber:Number;
  result;
  halls:Observable<Hall[]>;
  constructor(private movieService:MovieService,private router:Router) {
    this.halls=this.movieService.getAllHalls();

   }

  ngOnInit() {
    this.result=this.movieService.getAllHalls().subscribe(
        (data)=>{
        this.result=data;
      },
      (error)=>console.log(error)
    )
  }

  changed(e:Event){
  
    this.router.navigate(['shows',this.hallNumber]);
 
  }

}
