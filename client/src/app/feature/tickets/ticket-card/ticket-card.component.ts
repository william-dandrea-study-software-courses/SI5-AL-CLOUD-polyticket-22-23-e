import {Component, Input, OnInit} from '@angular/core';
import {TicketModel} from "../../../core/models/ticket.model";

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {

  @Input() public ticketV: TicketModel | null = null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.ticketV)
  }

}
