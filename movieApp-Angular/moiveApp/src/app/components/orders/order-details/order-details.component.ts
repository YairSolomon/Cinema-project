import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders-service/orders.service';
import { Show } from '../../../models/show';
import { Observable } from 'rxjs';
import { ShowsService } from '../../../services/shows-service/shows.service';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { FormBuilder, FormGroup, Validators, PatternValidator, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {

  clientOrderSeats = [];
  showId: Observable<Show>;
  show;
  price: number;
  userForm: FormGroup;
  cardType = [];
  months=[1,2,3,4,5,6,7,8,9,10,11,12];
  years=[2018,2019,2020,2021,2022,2023];
  currentDate:Date;



  constructor(private router:Router ,private fb: FormBuilder, private orderService: OrdersService, private showService: ShowsService, private route: ActivatedRoute, private userService: UsersService) {
    this.cardType = ['Visa', 'American Express', 'Mastercard']
    this.currentDate=new Date();
    this.currentDate.getFullYear();
    console.log( this.currentDate.getMonth())

  }

  async ngOnInit() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      cardType: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')]],
      validYear: ['',Validators.required],
      validMonth: ['',Validators.required],
      userId:['',[Validators.required,Validators.pattern("^\\d{9}$")]]

    })
    this.price = 50;
    this.clientOrderSeats = this.orderService.getClientSeats();

    this.route.params.subscribe((params: Params) => {
      this.showId = params['showId'];

    }, (error) => console.log(error))

    this.show = await this.showService.getShowById(this.showId);
    


  }
  checkValid(year:string){
    if(Number(year) === this.currentDate.getFullYear()){
      this.months=[];
      for(let i=0;i<(12-this.currentDate.getMonth());i++){
          this.months[i]=this.currentDate.getMonth()+1+i;
      }
      this.userForm.controls['validMonth'].setValue(this.months[0])
    }
    else{
     
      this.months=[1,2,3,4,5,6,7,8,9,10,11,12];
    }
  
  }
  onSubmit() {
    console.log(this.userForm)
    this.orderService.sendOrder(this.clientOrderSeats,this.showId).subscribe((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error)
    },
    ()=> this.router.navigate(['']))
        
  }

}
