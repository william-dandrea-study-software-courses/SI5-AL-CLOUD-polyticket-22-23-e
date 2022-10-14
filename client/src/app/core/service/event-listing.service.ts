import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventListingService {


  constructor(private http: HttpClient) {}


  public getAllTickets(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`https://us-central1-cloud-tickets.cloudfunctions.net/event-listing/all-events`);
  }


}
