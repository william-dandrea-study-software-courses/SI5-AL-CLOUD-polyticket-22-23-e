import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EventModel} from "../models/event.model";
import {HttpClient} from "@angular/common/http";
import {ErrorModel} from "../models/error.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public addEvent(nameInput: string, availableSeatsInput: number, dateInput: Date, artistInput: string, creatorEmailInput: string ): Observable<EventModel | ErrorModel> {
    return this.http.post<EventModel | ErrorModel>(`https://event-manager-idnoihwhaq-uc.a.run.app/new-event`, {
      name: nameInput,
      available_seats: availableSeatsInput,
      date: dateInput,
      artist: artistInput,
      creator_email: creatorEmailInput,
    })
  }
}
