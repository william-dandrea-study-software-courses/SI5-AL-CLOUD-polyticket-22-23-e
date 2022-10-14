import { Injectable } from '@angular/core';
import {CartModel} from "../models/cart.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartModel[] = [];
  public cart$: BehaviorSubject<CartModel[]> = new BehaviorSubject<CartModel[]>(this.cart)

  constructor() { }

  public addToCart(cart: CartModel): void {
    this.cart.push(cart);
    this.cart$.next(this.cart);
  }

  public removeFromCart(cart: CartModel): void {
    this.cart = this.cart.filter(c => c.id_cart != cart.id_cart )
    this.cart$.next(this.cart);
  }
}
