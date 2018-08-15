import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Hall } from '../../models/hall';
import { HallsService } from '../../services/hall-service/halls.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router, Event } from '@angular/router'
// import { $ } from 'protractor';


@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css'],


})
export class HallsComponent implements OnInit {


  halls: Observable<Hall[]>;
  myForm: FormGroup;
  form = [];
  updateMode: boolean;
  modalTitle: string;
  buttonValue: string;

  constructor(private hallService: HallsService, private fb: FormBuilder, private router: Router, private render: Renderer) {

  }
  ngOnInit() {

    this.updateMode = false;
    this.modalTitle = "Add Hall";
    this.buttonValue = "Add Hall";
    this.halls = this.hallService.getAllHalls();

    this.myForm = this.fb.group({
      hallNumber: ['', [Validators.required]],
      SeatsRows: ['', [Validators.required]],
      SeatsCols: ['', [Validators.required]],
    });

    this.form = this.hallService.form;

  }

  onAddMovieClick() {
    this.modalTitle = "Add Hall";
    this.buttonValue = "Add Hall";
    this.myForm.reset();
  }

  onSubmit(event: Event) {

    if (!this.updateMode) {

      this.hallService.addHall(this.myForm.value).subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => {
          console.log('added Movie')
          this.halls = this.hallService.getAllHalls();

        })
    }
    else {
      this.hallService.updateHall(this.myForm.value).subscribe(
        (data) => {
          console.log(data)
          console.log(this.halls)
        }
        ,
        (error) => console.log(error),
        () => {
          this.halls = this.hallService.getAllHalls();
          console.log('update completed')

        }
      )
      this.updateMode = false;
    }

    this.modalTitle = "Add Hall";
    this.buttonValue = "Add Hall";

    // need to check alternative way for this
    // $("#addEditHallModal").modal('hide');


  }

  deleteHall(hallNumber: number) {

    console.log(hallNumber);
    this.hallService.deleteHall(hallNumber).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => {
        this.halls = this.hallService.getAllHalls();

        console.log('delete process completed')
      })
  }

  updateHall(hallNumber: number, SeatsRows: number, SeatsCols: number) {
    this.updateMode = true;
    this.modalTitle = "Update Hall"
    this.buttonValue = "Update Hall"

    this.myForm = this.fb.group({
      hallNumber: [hallNumber, [Validators.required]],
      SeatsRows: [SeatsRows, [Validators.required]],
      SeatsCols: [SeatsCols, [Validators.required]],
    });
  }

}
