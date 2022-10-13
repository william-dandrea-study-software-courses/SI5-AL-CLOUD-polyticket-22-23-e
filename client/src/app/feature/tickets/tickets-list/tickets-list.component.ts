import { Component, OnInit } from '@angular/core';
import {TicketModel} from "../../../core/models/ticket.model";
import {TicketListingService} from "../../../core/service/ticket-listing.service";

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  public tickets: TicketModel[] = []

  constructor(private ticketListingService: TicketListingService) {}

  ngOnInit(): void {
    this.ticketListingService.getAllTickets().subscribe(tickets => {
      console.log(tickets)
      this.tickets = tickets;
    })
  }

}
