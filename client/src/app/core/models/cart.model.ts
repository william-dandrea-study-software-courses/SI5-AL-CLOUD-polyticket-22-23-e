

export interface CartModel {
  id_card: string,
  expirationDate: string | Date,
  event_id: number,
}

export function isCartModelInstance(obj: any) : CartModel | null  {

  if (obj.id_card && obj.expirationDate && obj.event_id) {

    const cart: CartModel = {
      id_card: obj.id_card,
      expirationDate: obj.expirationDate,
      event_id: obj.event_id,
    }

    return cart
  }

  return null;
}
