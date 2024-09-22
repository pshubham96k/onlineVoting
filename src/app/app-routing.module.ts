import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedCandidateComponent } from './dash-board/accepted-candidate/accepted-candidate.component';
import { CurrentElectionsComponent } from './dash-board/current-elections/current-elections.component';
import { RejectedCandidateComponent } from './dash-board/rejected-candidate/rejected-candidate.component';
import { ResultComponent } from './dash-board/result/result.component';
import { UnverifyCandidateComponent } from './dash-board/unverify-candidate/unverify-candidate.component';
import { VotingStatusComponent } from './dash-board/voting-status/voting-status.component';

const routes:Routes = [
  {path : 'accepted-candidate',component:AcceptedCandidateComponent},
  {path : 'current-election',component:CurrentElectionsComponent},
  {path : 'rejected-candidate',component:RejectedCandidateComponent},
  {path : 'result',component:ResultComponent},
  {path : 'unverify-candidate',component:UnverifyCandidateComponent},
  {path : 'voting-status',component:VotingStatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
