import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  ordersUrl = 'http://localhost:3000/orders';
  reservationsurl = 'http://localhost:3000/reservations'
  tempSeatsArray = [];
  showId;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }


  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl, this.httpOptions);
  }
  chooseSeats(chosenSeats, showId: string) {
    this.tempSeatsArray = chosenSeats;
    this.router.navigate([showId, 'order']);
  }
  getClientSeats() {
    return this.tempSeatsArray;
  }

  resetOrder() {
    this.tempSeatsArray = [];
  }

  sendOrder(chosenSeats, showId): Observable<any> {
    let orderDate = new Date();


    const data = new Order(showId, chosenSeats.length, chosenSeats, orderDate)

    return this.http.post(this.ordersUrl + '/' + showId, data, this.httpOptions)
  }

  async getReservedSeats(showId: string) {

    const response = await this.http.get<any>(this.ordersUrl + '/' + showId).toPromise()
    console.log(response);
    return response;
  }
  updateSeats(seat, showId: string): Observable<any> {

    const data = { seat: seat, showId: showId };
    return this.http.put(this.ordersUrl, data, this.httpOptions)
  }

  deleteOrder(orderId: string) {
    return this.http.delete(this.ordersUrl + '/' + orderId, this.httpOptions);
  }
} 
