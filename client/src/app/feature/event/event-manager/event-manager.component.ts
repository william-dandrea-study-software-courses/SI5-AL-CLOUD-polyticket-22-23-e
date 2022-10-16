import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../core/service/event.service";
import {ErrorModel, isErrorModelInstance} from "../../../core/models/error.model";
import {EventModel, isEventModelInstance} from "../../../core/models/event.model";
import {
  DialogWithOkButtonComponent
} from "../../../shared/components/dialog/dialog-with-ok-button/dialog-with-ok-button.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  DialogForNewEventComponent
} from "../../../shared/components/dialog/dialog-for-new-event/dialog-for-new-event.component";

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

  constructor(private formBuilder: FormBuilder, private eventService: EventService,  public dialog: MatDialog, private snackBar: MatSnackBar,) { }

  ngOnInit(): void {}


  public searchTicketWithId() {
    console.log(this.editEventIdForm.value)
  }

  public addEvent() {
    console.log(this.addEventForm.value)

    this.eventService.addEvent(this.addEventForm.value.name, this.addEventForm.value.available_seats, this.addEventForm.value.date, this.addEventForm.value.artist, this.addEventForm.value.creator_email).subscribe(v => {
      const error: ErrorModel | null = isErrorModelInstance(v);
      const event: EventModel | null = isEventModelInstance(v);


      console.log(v)
      if (event) {
        let dialogRef = this.dialog.open(DialogForNewEventComponent);
        dialogRef.componentInstance.id_event = String(event.id_event);
      } else {
        if (error) {
          console.log(error)
          this.snackBar.open(`Error : ${error.status}`)
        } else {
          this.snackBar.open(`Error append`)
        }
      }

    }, error => {
      console.log(error)
      const errorA: ErrorModel | null = isErrorModelInstance(error);
      if (errorA) {
        this.snackBar.open(`Error : ${error.status}`)
      } else {
        this.snackBar.open("Error append")
      }
    })
  }
}
