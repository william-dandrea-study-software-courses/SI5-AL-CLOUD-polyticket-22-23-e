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

  private TICKET_BOOKING_SERVICE = "https://ticket-booking-idnoihwhaq-uc.a.run.app"
  private TICKET_DETAILS_SERVICE = "https://us-central1-cloud-tickets.cloudfunctions.net"

  public optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };

  constructor(private http: HttpClient) { }


  public buyNewEticket(eventId: number): Observable<TicketModel | ErrorModel> {
    return this.http.get<TicketModel | ErrorModel>(`${this.TICKET_BOOKING_SERVICE}/create-eticket/${eventId}`, this.optionRequete)
  }

  public buyNewTicket(eventId: number): Observable<CartModel | ErrorModel> {
    return this.http.get<CartModel | ErrorModel>(`${this.TICKET_BOOKING_SERVICE}/create-ticket/${eventId}`, this.optionRequete)
  }


  public detailsAboutTicket(ticketId: string): Observable<ErrorModel | TicketDetailModel> {
    return this.http.get<ErrorModel | TicketDetailModel>(`${this.TICKET_DETAILS_SERVICE}/ticket-details/${ticketId}`, this.optionRequete);
  }


}
