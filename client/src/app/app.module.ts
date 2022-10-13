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

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    TicketsListComponent,
    TicketCardComponent,
    VideoManagerComponent,
    UploadVideoComponent
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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
