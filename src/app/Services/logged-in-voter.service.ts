import { Injectable } from '@angular/core';
import { Voter } from '../Model/Voter';

@Injectable({
  providedIn: 'root'
})
export class LoggedInVoterService {

  constructor() { }


  private voter:Voter=new Voter();
 
  setVoter(voter:Voter){
    this.voter=voter;
   // console.log(this.voter);
  }
  getVoter()
  {
   // console.log(this.voter);
    return this.voter;
  }
}
