import { Component, OnInit } from '@angular/core';
import {TicketModel} from "../../../../core/models/ticket.model";

@Component({
  selector: 'app-dialog-with-ok-button',
  templateUrl: './dialog-with-ok-button.component.html',
  styleUrls: ['./dialog-with-ok-button.component.scss']
})
export class DialogWithOkButtonComponent implements OnInit {

  public ticket: TicketModel | null = null;

  constructor() { }

  ngOnInit(): void {}

}
