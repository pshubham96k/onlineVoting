import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoterRegistrationComponent } from './voter-registration/voter-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoterLoginComponent } from './voter-login/voter-login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    VoterRegistrationComponent,
    VoterLoginComponent,
   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,//
    MatInputModule,//
    MatIconModule,//
    MatSelectModule,
    BrowserAnimationsModule

  ],
  exports:[
    VoterRegistrationComponent,
    VoterLoginComponent
  ]
 
})
export class RegistrationModule { }
