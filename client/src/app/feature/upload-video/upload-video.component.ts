import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileUploadService} from "../../core/service/file-upload.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventService} from "../../core/service/event.service";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  fileToUpload: File | null = null;

  @Input() public idEvent: number | null = null;

  constructor(private http: HttpClient, private fileUploadService: FileUploadService, private snackBar: MatSnackBar, private eventService: EventService) {}

  handleFileInput(event: any) {
    if (event.target != null) {
      this.fileToUpload = event.target.files.item(0);

      this.uploadFileToActivity();
    }
  }


  uploadFileToActivity() {
    if (this.fileToUpload != null && this.idEvent != null ) {
      this.fileUploadService.postFile(this.fileToUpload, String(this.idEvent)).subscribe(data => {
        // do something, if upload success
        console.log(data)
        this.snackBar.open("Video upload with success")
        this.eventService.getOneEvent(String(this.idEvent));
      }, error => {
        this.snackBar.open("Error occur when uploading video")
        console.log(error);
      });
    } else {
      this.snackBar.open("Please enter a video file")
    }
  }

  ngOnInit(): void {}

}
