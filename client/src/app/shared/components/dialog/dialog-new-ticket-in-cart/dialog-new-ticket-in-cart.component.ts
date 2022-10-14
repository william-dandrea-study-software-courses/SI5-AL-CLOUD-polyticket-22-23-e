import { Component, OnInit } from '@angular/core';
import {CartModel} from "../../../../core/models/cart.model";

@Component({
  selector: 'app-dialog-new-ticket-in-cart',
  templateUrl: './dialog-new-ticket-in-cart.component.html',
  styleUrls: ['./dialog-new-ticket-in-cart.component.scss']
})
export class DialogNewTicketInCartComponent implements OnInit {

  public cart: CartModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
