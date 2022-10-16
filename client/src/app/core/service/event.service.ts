import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EventModel} from "../models/event.model";
import {HttpClient} from "@angular/common/http";
import {ErrorModel} from "../models/error.model";
import {TicketModel} from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public currentEditEvent$: BehaviorSubject<EventModel | null> = new BehaviorSubject<EventModel | null>(null)

  constructor(private http: HttpClient) { }

  public addEvent(nameInput: string, availableSeatsInput: number, dateInput: Date, artistInput: string, creatorEmailInput: string ): Observable<EventModel | ErrorModel> {
    return this.http.post<EventModel | ErrorModel>(`https://event-manager-idnoihwhaq-uc.a.run.app/new-event`, {
      name: nameInput,
      available_seats: availableSeatsInput,
      date: dateInput.toISOString(),
      artist: artistInput,
      creator_email: creatorEmailInput,
    })
  }

  public getOneEvent(eventId: string): Promise<EventModel> {
    return new Promise((resolve, reject) => {
      this.http.get<EventModel>(`https://event-manager-idnoihwhaq-uc.a.run.app//event/${eventId}`).subscribe(v => {
        this.currentEditEvent$.next(v);
        resolve(v)
      }, error => reject(error))
    })
  }

  public addVideoToEvent() {

  }
}
