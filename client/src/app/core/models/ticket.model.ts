

export interface TicketModel {
  buy_date: string
  event_id: number
  type: string
  _id: string
}


export function isTicketModelInstance(obj: any) : TicketModel | null  {

  if (obj.buy_date && obj.event_id && obj.type && obj._id) {

    const ticket: TicketModel = {
      buy_date: obj.buy_date,
      event_id: obj.event_id,
      type: obj.type,
      _id: obj._id,
    }

    return ticket
  }

  return null;
}
