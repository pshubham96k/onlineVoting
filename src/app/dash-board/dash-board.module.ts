import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoterDashBoardComponent } from './voter-dash-board/voter-dash-board.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { WebcamModule } from 'ngx-webcam';
import { ResultComponent } from './result/result.component';
import { CurrentElectionsComponent } from './current-elections/current-elections.component';
import { VotingStatusComponent } from './voting-status/voting-status.component';
import { UnverifyCandidateComponent } from './unverify-candidate/unverify-candidate.component';
import { AcceptedCandidateComponent } from './accepted-candidate/accepted-candidate.component';
import { RejectedCandidateComponent } from './rejected-candidate/rejected-candidate.component';



@NgModule({
  declarations: [
    VoterDashBoardComponent,
    AdminDashBoardComponent,
    ResultComponent,
    CurrentElectionsComponent,
    VotingStatusComponent,
    UnverifyCandidateComponent,
    AcceptedCandidateComponent,
    RejectedCandidateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    WebcamModule
  ],
  exports:[
    VoterDashBoardComponent,
    AdminDashBoardComponent
  ]
  //providers:[VoterServiceService]
  
})
export class DashBoardModule { }
