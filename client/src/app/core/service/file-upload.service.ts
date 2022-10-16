import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File, idEvent: string): Observable<any> {
    const endpoint = `https://vod-gate-idnoihwhaq-uc.a.run.app/upload/${idEvent}`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData)
  }
}
