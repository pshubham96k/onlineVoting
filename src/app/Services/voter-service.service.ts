import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voter } from '../Model/Voter';


@Injectable({
  providedIn: 'root'
})
export class VoterServiceService {

  constructor() { }


  servAdharNumber:number;
  //servAdharNumber:string;

  setServAdharNumber(servAdharNumber:number){
      this.servAdharNumber=servAdharNumber;
  }

  getServAdharNumber()
  {
    return this.servAdharNumber;
  }

  
  
}
