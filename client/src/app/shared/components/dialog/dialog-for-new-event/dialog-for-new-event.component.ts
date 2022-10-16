import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-for-new-event',
  templateUrl: './dialog-for-new-event.component.html',
  styleUrls: ['./dialog-for-new-event.component.scss']
})
export class DialogForNewEventComponent implements OnInit {

  public id_event: string | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
