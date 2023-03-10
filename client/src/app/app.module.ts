import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBarComponent } from './shared/components/app-bar/app-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import { TicketsListComponent } from './feature/tickets/tickets-list/tickets-list.component';
import { TicketCardComponent } from './feature/tickets/ticket-card/ticket-card.component';
import { VideoManagerComponent } from './feature/video-manager/video-manager.component';
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {HttpClientModule} from "@angular/common/http";
import { UploadVideoComponent } from './feature/upload-video/upload-video.component';
import { DialogWithOkButtonComponent } from './shared/components/dialog/dialog-with-ok-button/dialog-with-ok-button.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { DialogNewTicketInCartComponent } from './shared/components/dialog/dialog-new-ticket-in-cart/dialog-new-ticket-in-cart.component';
import { TicketDetailComponent } from './feature/tickets/ticket-detail/ticket-detail.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { EventManagerComponent } from './feature/event/event-manager/event-manager.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { DialogForNewEventComponent } from './shared/components/dialog/dialog-for-new-event/dialog-for-new-event.component';
import {SafePipe} from "./shared/pipe/safe.pipe";

@NgModule({
    declarations: [
        AppComponent,
        AppBarComponent,
        TicketsListComponent,
        TicketCardComponent,
        VideoManagerComponent,
        UploadVideoComponent,
        DialogWithOkButtonComponent,
        DialogNewTicketInCartComponent,
        TicketDetailComponent,
        EventManagerComponent,
        DialogForNewEventComponent,
        SafePipe
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
