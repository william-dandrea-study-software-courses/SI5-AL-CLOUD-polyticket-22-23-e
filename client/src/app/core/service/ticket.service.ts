import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TicketModel} from "../models/ticket.model";
import {ErrorModel} from "../models/error.model";
import {CartModel} from "../models/cart.model";
import {TicketDetailModel} from "../models/ticket-detail.model";

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


  public detailsAboutTicket(ticketId: string): Observable<ErrorModel | TicketDetailModel> {
    return this.http.get<ErrorModel | TicketDetailModel>(`https://us-central1-cloud-tickets.cloudfunctions.net/ticket-details/${ticketId}`, this.optionRequete);
  }


}
