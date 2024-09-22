import { Injectable } from '@angular/core';
import { Candidate } from '../Model/Candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {

  constructor() { }

  public candidate:Candidate = new Candidate();

  setCandidate(candidate:Candidate){
    console.log(this.candidate);   
    this.candidate=candidate;
  }
  getCandidate()
  {
    console.log(this.candidate);
    return this.candidate;
  }
}
