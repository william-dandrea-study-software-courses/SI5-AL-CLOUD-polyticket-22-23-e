import {TicketModel} from "./ticket.model";


export interface ErrorModel {
  status: string;
}

export function isErrorModelInstance(obj: any) : ErrorModel | null  {

  if (obj.status) {

    const error: ErrorModel = {
      status: obj.status
    }

    return error
  }

  return null;
}
