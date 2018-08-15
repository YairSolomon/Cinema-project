import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaders,} from '@angular/common/http'
import {Movie} from '../../models/movie';
import {Hall} from '../../models/hall';
import {Show} from '../../models/show';
import { Observable } from 'rxjs';
import {FormGroup} from '@angular/forms';
// import 'rxjs/add/operator/toPromise'
 

@Injectable({
  providedIn: 'root'
})
export class HallsService {

  hallApiUrl='http://localhost:3000/halls';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  form = [
    { name: 'hall Number', formControl: 'hallNumber', type: 'number', max: 3, required: 'Please enter hall Number'},
     { name: 'Rows', formControl: 'SeatsRows', type: 'number', max: 3, required: 'Please enter  seats'},
     { name: 'Cols', formControl: 'SeatsCols', type: 'number', max: 3, required: 'Please enter  seats'}
    
  ];


  constructor(private http:HttpClient) { }

  getAllHalls(): Observable<Hall[]>{
    
    return this.http.get<Hall[]>(this.hallApiUrl);
  }
  addHall(newHall:FormGroup):Observable<any>{
 console.log(newHall);
    const hallValues = JSON.stringify(newHall);
    console.log(hallValues);
    return this.http.post<Hall>(this.hallApiUrl,hallValues,this.httpOptions);
  }

  deleteHall(hallNumber:number):Observable<any>{

    console.log(this.hallApiUrl+'/'+hallNumber);
    return this.http.delete<Hall>(this.hallApiUrl+'/'+hallNumber);
  }

  updateHall(hall:Hall):Observable<any>{

    const updatedHall=JSON.stringify(hall);
    return this.http.put(this.hallApiUrl+ '/' +hall.hallNumber,updatedHall,this.httpOptions);
  }
  getHall(hallNumber):Observable<any>{
    return this.http.get(this.hallApiUrl+'/'+hallNumber+'/data')
  }

  async getHallRowsAndCols(hallNumber){

    const response =await this.http.get(this.hallApiUrl+'/'+hallNumber+'/info').toPromise();
    return response
  }


  }





