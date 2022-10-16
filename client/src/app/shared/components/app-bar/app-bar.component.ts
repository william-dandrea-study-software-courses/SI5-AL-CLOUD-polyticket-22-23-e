import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../../core/service/cart.service";
import {CartModel} from "../../../core/models/cart.model";
import {isTicketModelInstance, TicketModel} from "../../../core/models/ticket.model";
import {ErrorModel, isErrorModelInstance} from "../../../core/models/error.model";
import {DialogWithOkButtonComponent} from "../dialog/dialog-with-ok-button/dialog-with-ok-button.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  public cartElements: CartModel[] = []

  constructor(private router: Router, private cartService: CartService, public dialog: MatDialog, private snackBar: MatSnackBar,) {
    this.cartService.cart$.subscribe(cart => {
      this.cartElements = cart;
    })
  }

  ngOnInit(): void {
  }

  goToVodService() {
    this.router.navigate(["video"])
  }

  goToMainPage() {
    this.router.navigate([""])
  }

  goToUploadVideoPage() {
    this.router.navigate(["upload-video"])
  }

  public goToEventManager() {
    this.router.navigate(["event-manager"])
  }

  payTicket(id_cart: string) {
    console.log(id_cart)
    this.cartService.payCartItem(id_cart).subscribe(v => {
      const ticket: TicketModel | null = isTicketModelInstance(v);
      const error: ErrorModel | null = isErrorModelInstance(v);
      console.log(v)

      if (ticket) {
        let dialogRef = this.dialog.open(DialogWithOkButtonComponent);
        dialogRef.componentInstance.ticket = ticket;
        this.cartService.removeFromCart(id_cart)
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

  goToTicketDetails() {
    this.router.navigate(["ticket-detail"])
  }
}
