import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Voter } from 'src/app/Model/Voter';
import { LoggedInVoterService } from 'src/app/Services/logged-in-voter.service';
import { VoterServiceService } from 'src/app/Services/voter-service.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-voter-login',
  templateUrl: './voter-login.component.html',
  styleUrls: ['./voter-login.component.css']
})
export class VoterLoginComponent {
  //app: any;
  constructor(private http:HttpClient,private app:AppComponent,private serv:VoterServiceService, public loggedVoterServ:LoggedInVoterService){}

  //url="http://13.235.113.128:8080/OnlineVotingSystem/";
  url="http://localhost:8080/";
  
  UIadharCardNumber:number;
  //UIadharCardNumber:string;
  UIpassword="";
  hide = true;
  voter:Voter;
  
  login(){
    console.log(this.UIadharCardNumber+" "+this.UIpassword);
    this.http.get(this.url+"login"+this.UIadharCardNumber+'and'+this.UIpassword).subscribe(
      (data:any)=>{
        if(data==-1)
          window.alert("not logged successfully");
          else if(data==-2)
          window.alert("user are not verified please verify first");
        else
        {
          alert("login successfull");
          this.http.get(this.url+"getVoterFullName"+this.UIadharCardNumber).subscribe(
            (result:any)=>{
              console.log(result);
              this.loggedVoterServ.setVoter(result);

              this.app.isLogSucess=data;
              this.app.whatToShow=0;
              this.app.showNavButton=1;
              this.serv.setServAdharNumber(this.UIadharCardNumber);            
            }
          )
         
        }
      }
    )
  }

   


}
