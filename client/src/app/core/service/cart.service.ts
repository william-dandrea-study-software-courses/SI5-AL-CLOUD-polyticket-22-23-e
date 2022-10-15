import { Injectable } from '@angular/core';
import {CartModel} from "../models/cart.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TicketModel} from "../models/ticket.model";
import {ErrorModel} from "../models/error.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartModel[] = [];
  public cart$: BehaviorSubject<CartModel[]> = new BehaviorSubject<CartModel[]>(this.cart)

  constructor(private http: HttpClient) { }

  public addToCart(cart: CartModel): void {
    this.cart.push(cart);
    this.cart$.next(this.cart);
  }

  public removeFromCart(id_cart: string): void {
    this.cart = this.cart.filter(c => c.id_cart != id_cart )
    this.cart$.next(this.cart);
  }


  public payCartItem(cartId: string): Observable<TicketModel | ErrorModel> {
    return this.http.get<TicketModel | ErrorModel>(`https://ticket-booking-idnoihwhaq-uc.a.run.app/${cartId}/pay`);
  }
}
