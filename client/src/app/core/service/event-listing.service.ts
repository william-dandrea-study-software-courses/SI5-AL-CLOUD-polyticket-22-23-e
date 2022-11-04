import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventListingService {

  private URL_SERVICE = "https://us-central1-cloud-tickets.cloudfunctions.net/event-listing"


  constructor(private http: HttpClient) {}


  public getAllTickets(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.URL_SERVICE}/all-events`);
  }


}
