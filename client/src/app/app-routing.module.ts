import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsListComponent} from "./feature/tickets/tickets-list/tickets-list.component";
import {VideoManagerComponent} from "./feature/video-manager/video-manager.component";

const routes: Routes = [
  {
    path: "",
    component: TicketsListComponent,
  },
  {
    path: "video",
    component: VideoManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
