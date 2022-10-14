import {Component, Input, OnInit} from '@angular/core';
import {TicketService} from "../../../core/service/ticket.service";
import {EventModel} from "../../../core/models/event.model";

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {

  @Input() public event: EventModel | null = null;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    console.log(this.event)
  }

  public dateEvent(): string {
    if (this.event != null) {
      const date: Date = new Date(this.event?.date_event)
      this.event.date_event = date;
      return date.toDateString()
    }

    return "";
  }

  public buyEticket() {
    if (this.event) {
      this.ticketService.buyNewEticket(this.event.id_event).subscribe(v => {
        console.log(v)
      }, error => {
        console.log(error)
      })
    }

  }

  public buyTicket() {

  }
}
