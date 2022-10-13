import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileUploadService} from "../../core/service/file-upload.service";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  fileToUpload: File | null = null;

  constructor(private http: HttpClient, private fileUploadService: FileUploadService) {}

  handleFileInput(event: any) {
    if (event.target != null) {
      this.fileToUpload = event.target.files.item(0);

      this.uploadFileToActivity();
    }
  }


  uploadFileToActivity() {
    if (this.fileToUpload != null) {
      this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
        // do something, if upload success
        console.log(data)
      }, error => {
        console.log(error);
      });
    }
  }

  ngOnInit(): void {}

}
