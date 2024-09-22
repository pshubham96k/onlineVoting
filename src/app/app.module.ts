import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationModule } from './registration/registration.module';
import { DashBoardModule } from './dash-board/dash-board.module';
import { VoterRegistrationComponent } from './registration/voter-registration/voter-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    DashBoardModule,
    NgbModule,
    BrowserAnimationsModule, // rquired animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [VoterRegistrationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
