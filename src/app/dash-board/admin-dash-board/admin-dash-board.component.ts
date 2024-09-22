import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Candidate } from 'src/app/Model/Candidate';
import { DistrictData } from 'src/app/Model/DistrictData';
import { StateData } from 'src/app/Model/StateData';
import { TalukaData } from 'src/app/Model/TalukaData';
import { VillegeData } from 'src/app/Model/VillegeData';
import { Voter } from 'src/app/Model/Voter';
import { LoggedInVoterService } from 'src/app/Services/logged-in-voter.service';
import {VillegeElection } from 'src/app/Model/VillegeElection';
import { CandidateOfVillegeElection } from 'src/app/Model/CandidateOfVillegeElection';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { CurrentElectionsComponent } from '../current-elections/current-elections.component';
//import { PostOffice } from 'src/app/Model/PostOffice';

interface PostOffice {
  Name: string;
  Block: string;
  // Include other properties as needed
}

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
  //providers:[VoterServiceService]
})

// const routes: Routes = [
//   { path: 'current-election', component: CurrentElectionsComponent },
//   { path: 'result', component: ResultComponent },
//   { path: 'voting-status', component: VotingStatusComponent },
//   { path: 'unverify-candidate', component: UnverifyCandidateComponent },
//   { path: 'accepted-candidate', component: AcceptedCandidateComponent },
//   { path: 'rejected-candidate', component: RejectedCandidateComponent }
// ];

export class AdminDashBoardComponent {
  minDate: Date;
  constructor(private http:HttpClient,public voterServ:LoggedInVoterService,private toastr: ToastrService){
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  }
  //url="http://13.235.113.128:8080/OnlineVotingSystem/";
  url="http://localhost:8080/";
  url1="https://api.postalpincode.in/pincode/"
  voter:Voter;
  
  postOffice:PostOffice[]=[];
  uniqueBlocks : string[] = [];
  UIPincode:number;
  selectedVillege:string;
  getVillegee() {
    this.http.get(this.url1 + this.UIPincode).subscribe(
      (data: any) => {
        console.log(data);
        // Assuming the API always returns an array
        if (data.length > 0 && data[0].Status === 'Success') {
          console.log(data[0].Status);
          // Access the PostOffice property of the first item in the response array
          this.postOffice = data[0].PostOffice;
          console.log(this.postOffice);
          // Map to get the names of the post offices
          this.uniqueBlocks = this.postOffice.map((postOffice: any) => postOffice.Name);
          console.log(this.uniqueBlocks);
        }
      }
    )
  }
 
    


  ElectionType:string="";
  candidateResult:Candidate[]=[];
  loadCandidateResult(){
    this.http.get(this.url+'LoadcandidateResult'+this.selectedVillege).subscribe(
      (data:any)=>{
        if(data==null)
        window.alert("exception on server error");
        else
        {
          this.candidateResult=data;
          for (let i = 0; i < this.candidateResult.length; i++) {
            for (let j = i+1; j < this.candidateResult.length; j++) {
             if (this.candidateResult[i].vote<this.candidateResult[j].vote)
            {
              let temp=this.candidateResult[i];
              this.candidateResult[i]=this.candidateResult[j];
              this.candidateResult[j]=temp;
            }    
          }   
        }
      }    
    }
  )
}

  
state:StateData=new StateData();
AddDataType:string="";
  AddData(){
    console.log(this.state);
    
    this.http.post(this.url+"addState",this.state).subscribe(
      (data:any) =>{
        if(data=false)
        window.alert("Exception on server");
        else
        window.alert("State add successfully.........");
      }
    )
  }

  district:DistrictData=new DistrictData();

  addDistrict(){
    this.http.post(this.url+"addDistrictData",this.district).subscribe(
      (data:any) =>{
        if(data==false)
        window.alert("Exception on server....");
        else{
          window.alert("District added successfully..........");
        }
      }
    )
  }

  taluka:TalukaData=new TalukaData();

  addTaluka(){
    this.http.post(this.url+"addTaluka",this.taluka).subscribe(
      (data:any)=>{
        if(data==false){
          window.alert("Exception on server.......");
        }else
        window.alert("Taluka added successfully.................");
      }
    )
  }

  villege:VillegeData=new VillegeData();
  AddVillege(){
    this.http.post(this.url+"addVillege",this.villege).subscribe(
      (data:any)=>{
        if(data==false)
        window.alert("Exception on server.......");
        else
        window.alert("Villege added successfully.................");
      }
    )
  }


  //SelectedElectionType:string;
  showButtons:boolean = false;
  toggleButton(){
    this.showButtons = !this.showButtons;
  }
  toggleForm:boolean=false;
  loadForm(){
    this.toggleForm=!this.toggleForm;
  }
  
  elections:VillegeElection=new VillegeElection();
  addElection(){
      this.http.post(this.url+"addElection",this.elections).subscribe(
        (data) => {
          console.log(data);
          if(data=false)
          {
            //window.alert("Exception in server.....!!!!")
            this.toastr.success("Exception in server...",'Error');
          }
          else
          {
            //window.alert("Election successfully added.....!!!")
            this.toastr.success("Election successfully added...","success");
            this.elections = new VillegeElection();
          }
        }
      )
  }

  isVotingStatusVisible: boolean = false;
  totalVoterCount:number=0;
  voterVotedCount:number=0;
  voterWithoutVotingCount:number=0;
  toggleVotingStatusVisibility() {
    this.isVotingStatusVisible = !this.isVotingStatusVisible;
  }
  getVotingStatus(){
    this.toggleVotingStatusVisibility();
    this.http.get(this.url+"getVotingStatus").subscribe(
      (data:any)=>{
        console.log(data);
        
        this.totalVoterCount=data;
      }
    )
    this.http.get(this.url+"getVotedCount").subscribe(
      (data:any)=>{
        console.log("Voted count "+data);
        this.voterVotedCount=data;
      }
    )
  }

  showUnverifyCandidateButtons:boolean = false;
  UnverifyCandidateButtons(){
    this.showUnverifyCandidateButtons = !this.showUnverifyCandidateButtons;
  }

 

  candidateDetails:CandidateOfVillegeElection[]=[];
  CandidateVerification(){
    this.http.get(this.url+"LoadCandidateForVerification").subscribe(
      (data:any) =>{
        console.log(data);
        this.candidateDetails=data;
      }
    )
  }

  candidateAccepted(i:number){
    this.http.get(this.url+"candidateAccepted"+this.candidateDetails[i].adharCardNumber).subscribe(
      (data:any) => {
          if(data=false)
          {
            window.alert("Exception on server.....");
          }
          else
          {
            window.alert("Candidate Verify successfully..!!!");
          }
      }
    )
  }

  candidateRejected(i:number){
    this.http.get(this.url+"getRejectedCandidate"+this.candidateDetails[i].adharCardNumber).subscribe(
      (data:any) => {
            if(data=false)
            {
              window.alert("Exception on server.....!!!");
            }
            else
            {
              window.alert("Candidate rejected successfully..!!!");
            }
      }
    )
  }
  isAcceptedCandidateLoaded: boolean = false;
  acceptedCandidate:Candidate[]=[];
  loadAcceptedCandidateFromDB(){
    this.http.get(this.url+"loadAcceptedCandidateFromDB").subscribe(
      (data:any) =>{
        this.acceptedCandidate=data;
       this.isAcceptedCandidateLoaded = true;
      }
    )
  }
  
  generatePDF() {
    const doc = new jsPDF();
  
     const logoWidth = 30; // Adjust based on the dimensions of your logo
      const logoHeight = 30; // Adjust based on the dimensions of your logo

      
    // Transform your data to include a "Status" field based on "isVerified"
    const dataWithStatus = this.acceptedCandidate.map(candidate => ({
      ...candidate,
      Status: candidate.isVerified === 1 ? 'Accepted' : 'Rejected', // Add "Status" field
    }));
  
    const excludedFields = ['id', 'age', 'vote','isVerified']; // Exclude 'isVerified'
  
    // Define columns, including the "Sr. No." and "Status" while excluding specified fields
    const columns = ['Sr. No.', ...Object.keys(dataWithStatus[0])
      .filter(key => !excludedFields.includes(key))
      .map(key => key.charAt(0).toUpperCase() + key.slice(1))]; // Capitalize the first letter of each key
  
    // Prepare the body of the table, including the serial number and excluding specified fields
    const body = dataWithStatus.map((item, index) => 
      [index + 1, // Add serial number
       ...Object.entries(item)
        .filter(([key]) => !excludedFields.includes(key))
        .map(([_, value]) => value)]);

        // Custom heading style
    const heading = "Accepted Candidates";
    const headingFontSize = 14;
    doc.setFontSize(headingFontSize);
  
    autoTable(doc, {
      head: [columns],
      body: body,
      margin: { top: 30 },
      didDrawPage: function(data) {
      // Main title
      const mainTitle = "Election Commission of India";
      // Subtitle
      const subTitle = "Accepted Candidates";


      const logo = 'assets/images/pdfVotingLogo1.png'; // Add your Base64-encoded image data here
      const logoX = 10; // X position
      const logoY = 2; // Y position
      const logoWidth = 50; // Width of the logo 40
      const logoHeight = 25; // Height of the logo 20
    
      doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
      const contentStartY = logoY + logoHeight + 50; // Adjust 10 for padding below logo
      



      // Settings for the title
      doc.setFontSize(16); // Adjust size as needed
      doc.setFont("helvetica", "bold");
      // Calculate the title's x position to center it
      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      let titleX = (pageWidth - doc.getTextWidth(mainTitle)) / 2;
      doc.text(mainTitle, titleX, 10);

      // Settings for the subtitle, change font size or style as needed
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      // Calculate the subtitle's x position to center it
      let subTitleX = (pageWidth - doc.getTextWidth(subTitle)) / 2;
      doc.text(subTitle, subTitleX, 20); // Adjust y position as needed
    },
      // Include any additional styling or configuration as needed
    });

    doc.save('accepted-candidates.pdf');
  }
  
  
  


  rejectedCandidate:Candidate[]=[];
  showRejectedCandidates: boolean = false;
  loadRejectedCandidate(){
    this.showRejectedCandidates = !this.showRejectedCandidates;
    this.http.get(this.url+"loadRejectedCandidateFromDB").subscribe(
      (data:any) => {
        console.log(data);
        this.rejectedCandidate=data;
      }
    )
  }  

  //=====================
  
}
