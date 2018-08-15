import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie';
import { HttpClient, HttpHeaders, } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Show } from '../../models/show';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  showsUrl = 'http://localhost:3000/shows';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  //get all Shows per Hall Number

  getAllShows(hallNumber: Number): Observable<Show[]> {
    let hall = JSON.stringify(hallNumber);

    return this.http.get<Show[]>(this.showsUrl + '/' + hall);
  }

  //get all shows by movie title

  getShowByTitle(title: string): Observable<Show> {
  
    let showByTitleUrl=this.showsUrl+'/order/'+title;
    
    return this.http.get<Show>(showByTitleUrl, this.httpOptions);

  }

  async getShowById(showId){
    let response;
    response = await this.http.get<Show>(this.showsUrl+'/show/'+showId).toPromise();
    return response;
  }

  //Add Show
  addShow(showData: FormGroup, hallNumber: Number): Observable<any> {

    console.log(showData);
    let show = JSON.stringify(showData);

    //very important note!!
    /// we have to send the json as an Object to server unless it will thorw an error !!! --> // let Movie=JSON.stringify({movie})

    const postUrl = this.showsUrl + '/' + hallNumber;
    return this.http.post(postUrl, show, this.httpOptions);

  }

  //delete show
  deleteShow(showId: string): Observable<any> {
    return this.http.delete(this.showsUrl + '/' + showId, this.httpOptions);
  }

  //update show

  updateShow(UpdatedShow: Show, showId: string): Observable<Show> {
    let show = JSON.stringify(UpdatedShow);
    console.log(show);
    return this.http.put(this.showsUrl + '/' + showId, show, this.httpOptions);
  }
}
