import {ErrorModel} from "./error.model";


export interface EventModel {
  id_event: number,
  name_event: string,
  email_owner: string,
  date_event: string | Date,
  available_seats: number,
  artist: string,
  vod_link: string | null,
}


export function isEventModelInstance(obj: any) : EventModel | null  {

  if (obj.id_event && obj.name_event && obj.email_owner && obj.date_event && obj.available_seats && obj.artist) {

    const event: EventModel = {
      id_event: obj.id_event,
      name_event: obj.name_event,
      email_owner: obj.email_owner,
      date_event: obj.date_event,
      available_seats: obj.available_seats,
      artist: obj.artist,
      vod_link: obj.vod_link,
    }

    return event
  }

  return null;
}
