import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent implements OnInit {

  @Input() currentVideo: string = '';



  data: any;
  constructor() { }
  ngOnInit(): void { }
  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
  }

  initVdo() {
    this.data.play();
  }


}
