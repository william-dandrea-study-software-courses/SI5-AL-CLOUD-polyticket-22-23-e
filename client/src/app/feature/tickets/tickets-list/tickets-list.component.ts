import { Component, OnInit } from '@angular/core';
import {TicketModel} from "../../../core/models/ticket.model";

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  public tickets: TicketModel[] = [
    {
      id: 0,
      title: "Concert de Jean Duvoyage",
      regular_tickets_available: 30,
    },
    {
      id: 1,
      title: "Event de Jean Delacouette",
      regular_tickets_available: 30,
    },
    {
      id: 2,
      title: "Meetup de Alexandra Lacroute",
      regular_tickets_available: 30,
    },
    {
      id: 3,
      title: "Journal de Claire Chabal",
      regular_tickets_available: 30,
    },
    {
      id: 4,
      title: "Match de Zinedine Tzigane",
      regular_tickets_available: 30,
    },
    {
      id: 5,
      title: "Episode de Mimi Maxi",
      regular_tickets_available: 30,
    },
  ]

  constructor() { }

  ngOnInit(): void {}

}
