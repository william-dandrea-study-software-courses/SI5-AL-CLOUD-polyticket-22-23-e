import {EventModel} from "./event.model";
import {TicketModel} from "./ticket.model";


export interface TicketDetailModel {
  infosEvent: EventModel;
  ticket: TicketModel;
}

export function isTicketDetailModelInstance(obj: any) : TicketDetailModel | null  {

  if (obj.infosEvent && obj.ticket) {

    const ticketDetail: TicketDetailModel = {
      infosEvent: obj.infosEvent,
      ticket: obj.ticket,
    }
    return ticketDetail
  }

  return null;
}
