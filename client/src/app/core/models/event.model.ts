

export interface EventModel {
  id_event: number,
  name_event: string,
  email_owner: string,
  date_event: string | Date,
  available_seats: number,
  artist: string,
  vod_link: string | null,
}
