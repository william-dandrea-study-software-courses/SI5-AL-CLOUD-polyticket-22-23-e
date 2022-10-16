import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsListComponent} from "./feature/tickets/tickets-list/tickets-list.component";
import {VideoManagerComponent} from "./feature/video-manager/video-manager.component";
import {UploadVideoComponent} from "./feature/upload-video/upload-video.component";
import {TicketDetailComponent} from "./feature/tickets/ticket-detail/ticket-detail.component";

const routes: Routes = [
  {
    path: "",
    component: TicketsListComponent,
  },
  {
    path: "video",
    component: VideoManagerComponent,
  },
  {
    path: "upload-video",
    component: UploadVideoComponent,
  },
  {
    path: "ticket-detail",
    component: TicketDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
