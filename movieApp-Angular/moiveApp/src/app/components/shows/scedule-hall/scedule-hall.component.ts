import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../../../services/movies-service/movie.service'
import { Observable } from 'rxjs';
import { Show } from '../../../models/show';

import { Hall } from '../../../models/hall';

import { HallsService } from '../../../services/hall-service/halls.service';
import { Movie } from '../../../models/movie';
import { ShowsService } from '../../../services/shows-service/shows.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { get } from 'selenium-webdriver/http';


@Component({
  selector: 'app-scedule-hall',
  templateUrl: './scedule-hall.component.html',
  styleUrls: ['./scedule-hall.component.css']
})
export class SceduleHallComponent implements OnInit {

  movies: Observable<Movie[]>;
  modalTitle: String
  myForm: FormGroup;
  shows: Observable<Show>;
  hallnumber: number;
  seats: number;
  selectedMovie: boolean;
  updateMode: boolean;
  showId: string;
  reservedSeat = [];


  constructor(private route: ActivatedRoute, private router: Router, private hallService: HallsService
    , private movieService: MovieService, private showsService: ShowsService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.updateMode = false;
    this.modalTitle = "Add Show"
    this.selectedMovie = false
    this.movies = this.movieService.getAllMovies();


    this.myForm = this.fb.group({
      movie: ['', [Validators.required]],
      showDate: ['', [Validators.required]],
      showHour: ['', [Validators.required]],
      reservedSeats: [this.fb.array([])],
    });




    this.route.params.subscribe(
      (params: Params) => {

        this.hallnumber = +params['number'];
        this.shows = this.showsService.getAllShows(this.hallnumber);

        this.showsService.getAllShows(this.hallnumber).subscribe((data) => {
          console.log(data);
        })

        this.hallService.getHall(this.hallnumber).subscribe((data) => {
          this.seats = data;
        })
      })
  }

  onAddShow(shwId) {
    this.updateMode = false;
    this.modalTitle = "Add Show";
    this.myForm.reset();

  }
  onSubmit() {
    if (this.updateMode) {

      this.showsService.updateShow(this.myForm.value, this.showId).subscribe(
        (data) => {
          console.log(data)
        },
        (error) => {
          console.log(error)
        },
        () => {
          this.shows = this.showsService.getAllShows(this.hallnumber);
        }
      )
    }

    else {
      console.log(this.myForm.value);
      this.myForm.controls['reservedSeats'].setValue([]);
      this.showsService.addShow(this.myForm.value, this.hallnumber).subscribe(

        (data) => {
          console.log(data)
        },
        (error) => console.log(error),
        () => {
          console.log('show was added to DB')
          this.shows = this.showsService.getAllShows(this.hallnumber);
        }
      )

    }

  }

  updateShow(showId: string, movieTitle: string, showDate: string, ShowHour: string) {
    this.showId = showId;
    this.updateMode = true;
    // need to fix date issue!

    this.modalTitle = "Update Show"
    this.myForm = this.fb.group({
      movie: [movieTitle, [Validators.required]],
      showDate: [, [Validators.required]],
      showHour: [ShowHour, [Validators.required]],

    })

  }

  deleteShow(showId: string) {
    this.showsService.deleteShow(showId).subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.log(error)
      },
      () => {
        console.log('show was deleted successfuly');
        this.shows = this.showsService.getAllShows(this.hallnumber);
      }
    )
  }

}
