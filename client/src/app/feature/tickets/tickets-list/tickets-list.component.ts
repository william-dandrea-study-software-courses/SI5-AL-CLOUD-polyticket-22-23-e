import { Component, OnInit } from '@angular/core';
import {EventModel} from "../../../core/models/event.model";
import {EventListingService} from "../../../core/service/event-listing.service";

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  public events: EventModel[] = []

  constructor(private eventListingService: EventListingService) {}

  ngOnInit(): void {
    this.eventListingService.getAllTickets().subscribe(events => {
      console.log(events)
      this.events = events;
    })
  }

}
