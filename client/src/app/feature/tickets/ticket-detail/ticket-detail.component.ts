import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../../core/service/ticket.service";
import {isTicketDetailModelInstance, TicketDetailModel} from "../../../core/models/ticket-detail.model";
import {ErrorModel, isErrorModelInstance} from "../../../core/models/error.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  public form: FormGroup = this.formBuilder.group({
    id_event: ["", [Validators.required]],
  });

  public isLoading: boolean = false;
  public ticketDetail: TicketDetailModel | null = null;
  public errorMessage: ErrorModel | null = null;


  constructor(private formBuilder: FormBuilder, private ticketService: TicketService, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }


  public valididate() {
    this.isLoading = true;
    this.ticketService.detailsAboutTicket(this.form.value.id_event).subscribe(v => {
      this.isLoading = false;

      this.ticketDetail = isTicketDetailModelInstance(v)
      this.errorMessage = isErrorModelInstance(v);

      console.log(this.ticketDetail?.infosEvent.vod_link)

      if (this.errorMessage != null) {
        this.snackBar.open(this.errorMessage.status)
      }

    }, error => {
      this.isLoading = false;
      console.log(error)
      this.snackBar.open("Network problem")
    });
  }

  public videoVodLink() {
    if (this.ticketDetail) {
      if (this.ticketDetail.infosEvent.vod_link) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.ticketDetail.infosEvent.vod_link);
      }
    }
    return '';
  }


}

