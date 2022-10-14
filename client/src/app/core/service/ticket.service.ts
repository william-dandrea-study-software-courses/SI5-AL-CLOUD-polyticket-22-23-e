import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TicketModel} from "../models/ticket.model";
import {ErrorModel} from "../models/error.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }


  public buyNewEticket(eventId: number): Observable<TicketModel | ErrorModel> {
    return this.http.post<TicketModel | ErrorModel>(`https://ticket-booking-idnoihwhaq-uc.a.run.app/create-eticket/${eventId}`, {})
  }




}
