import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TicketModel} from "../models/ticket.model";
import {ErrorModel} from "../models/error.model";
import {CartModel} from "../models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };

  constructor(private http: HttpClient) { }


  public buyNewEticket(eventId: number): Observable<TicketModel | ErrorModel> {
    return this.http.get<TicketModel | ErrorModel>(`https://ticket-booking-idnoihwhaq-uc.a.run.app/create-eticket/${eventId}`, this.optionRequete)
  }

  public buyNewTicket(eventId: number): Observable<CartModel | ErrorModel> {
    return this.http.get<CartModel | ErrorModel>(`https://ticket-booking-idnoihwhaq-uc.a.run.app/create-ticket/${eventId}`, this.optionRequete)
  }



}
