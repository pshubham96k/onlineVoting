import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { VoterRegistrationComponent } from './registration/voter-registration/voter-registration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient,private voter:VoterRegistrationComponent){};
  title = 'OnlineVoting';
  whatToShow=0;
  showNavButton=0;
  url="http://localhost:8080/";
  show(num:number)
  {
    this.whatToShow=num; 
  }
  isLogSucess=0;
  


  
}
