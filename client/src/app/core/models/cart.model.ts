

export interface CartModel {
  id_cart: string,
  expirationDate: string | Date,
  event_id: number,
  _id: string
}

export function isCartModelInstance(obj: any) : CartModel | null  {
  if (obj.id_cart && obj.expirationDate && obj.event_id && obj._id) {

    const cart: CartModel = {
      id_cart: obj.id_cart,
      expirationDate: obj.expirationDate,
      event_id: obj.event_id,
      _id: obj._id,
    }
    return cart
  }
  return null;
}
