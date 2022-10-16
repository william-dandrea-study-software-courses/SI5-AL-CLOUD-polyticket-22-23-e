import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../core/service/event.service";

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {

  public editEventIdForm: FormGroup = this.formBuilder.group({
    id_event: ["", [Validators.required]],
  });

  public addEventForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required]],
    available_seats: [100, [Validators.required]],
    date: [new Date(), [Validators.required]],
    artist: ["", [Validators.required]],
    creator_email: ["", [Validators.required, Validators.email]],
  });

  constructor(private formBuilder: FormBuilder, private eventService: EventService) { }

  ngOnInit(): void {}


  public searchTicketWithId() {
    console.log(this.editEventIdForm.value)
  }

  public addEvent() {
    console.log(this.addEventForm.value)

    this.eventService.addEvent(this.addEventForm.value.name, this.addEventForm.value.available_seats, this.addEventForm.value.date, this.addEventForm.value.artist, this.addEventForm.value.creator_email).subscribe(v => {
      console.log(v)
    })



  }


}
