import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketModel} from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class TicketListingService {

  private httpOptions = {
    headers: new HttpHeaders()
  }



  constructor(private http: HttpClient) {
    this.httpOptions.headers.append('Access-Control-Allow-Origin', '*');

  }


  public getAllTickets(): Observable<any> {
    return this.http.get(`https://us-central1-cloud-tickets.cloudfunctions.net/event-listing/all-events`, this.httpOptions);
  }


}
