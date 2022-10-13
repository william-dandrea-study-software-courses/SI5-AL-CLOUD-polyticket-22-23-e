import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToVodService() {
    this.router.navigate(["video"])
  }

  goToMainPage() {
    this.router.navigate([""])
  }

  goToUploadVideoPage() {
    this.router.navigate(["upload-video"])
  }
}
