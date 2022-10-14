import {Component, Input, OnInit} from '@angular/core';
import {TicketService} from "../../../core/service/ticket.service";
import {EventModel} from "../../../core/models/event.model";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogWithOkButtonComponent
} from "../../../shared/components/dialog/dialog-with-ok-button/dialog-with-ok-button.component";
import {isTicketModelInstance, TicketModel} from "../../../core/models/ticket.model";
import {ErrorModel, isErrorModelInstance} from "../../../core/models/error.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartModel, isCartModelInstance} from "../../../core/models/cart.model";
import {
  DialogNewTicketInCartComponent
} from "../../../shared/components/dialog/dialog-new-ticket-in-cart/dialog-new-ticket-in-cart.component";

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {

  @Input() public event: EventModel | null = null;

  constructor(private ticketService: TicketService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
        const ticket: TicketModel | null = isTicketModelInstance(v);
        const error: ErrorModel | null = isErrorModelInstance(v);

        if (ticket) {
          let dialogRef = this.dialog.open(DialogWithOkButtonComponent);
          dialogRef.componentInstance.ticket = ticket;
        }

        if (error) {
          console.log(error)
          this.snackBar.open(`Error : ${error.status}`)
        }
      }, error => {
        console.log(error)
        const errorA: ErrorModel | null = isErrorModelInstance(error);
        if (errorA) {
          this.snackBar.open(`Error : ${error.status}`)
        }

      })
    }

  }

  public buyTicket() {
    if (this.event) {
      this.ticketService.buyNewTicket(this.event.id_event).subscribe(v => {
        const cart: CartModel | null = isCartModelInstance(v);
        const error: ErrorModel | null = isErrorModelInstance(v);

        if (cart) {
          let dialogRef = this.dialog.open(DialogNewTicketInCartComponent);
          dialogRef.componentInstance.cart = cart;
        }

        if (error) {
          console.log(error)
          this.snackBar.open(`Error : ${error.status}`)
        }

      }, error => {
        console.log(error)
        const errorA: ErrorModel | null = isErrorModelInstance(error);
        if (errorA) {
          this.snackBar.open(`Error : ${error.status}`)
        }
      })
    }
  }
}
