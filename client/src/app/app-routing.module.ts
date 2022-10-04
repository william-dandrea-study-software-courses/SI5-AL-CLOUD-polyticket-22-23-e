import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsListComponent} from "./feature/tickets/tickets-list/tickets-list.component";

const routes: Routes = [
  {
    path: "",
    component: TicketsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
