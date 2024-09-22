import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/Model/Candidate';
import { Voter } from 'src/app/Model/Voter';
import { LoggedInVoterService } from 'src/app/Services/logged-in-voter.service';
import { VoterServiceService } from 'src/app/Services/voter-service.service';
import { CandidateServiceService } from 'src/app/Services/candidate-service.service';
import { AppComponent } from 'src/app/app.component';

import { VillegeElection } from 'src/app/Model/VillegeElection';
import { VillegeElectionOfCandidateStatus } from 'src/app/Model/VillegeElectionOfCandidateStatus';
import { CandidateOfVillegeElection } from 'src/app/Model/CandidateOfVillegeElection';
import { LoadcandidateOfVillege } from 'src/app/Model/LoadCandidateOfVillege';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-voter-dash-board',
  templateUrl: './voter-dash-board.component.html',
  styleUrls: ['./voter-dash-board.component.css'],
  
})
export class VoterDashBoardComponent implements OnInit{
qrCodeText: any;
constructor(private http:HttpClient,private serv:VoterServiceService,app:AppComponent,public voterServ:LoggedInVoterService,public candidateServ:CandidateServiceService,private fb:FormBuilder){}

//url="http://13.235.113.128:8080/OnlineVotingSystem/";
url="http://localhost:8080/";



updateVoterProfile:Voter;
// ===========

ngOnInit() {
  this.registrationForm = this.fb.group({
    candidateName: ['', Validators.required],
    adharCardNumber: ['', Validators.required],
    age: ['', Validators.required],
    politicalParty: ['', Validators.required]
  });

  this.updateVoterProfile = new Voter();
}

isProfileVisible: boolean = false;
showProfile(){
  this.isProfileVisible = !this.isProfileVisible;
  this.updateVoterProfile=this.voterServ.getVoter();
  console.log(this.updateVoterProfile);
}
saveProfile(){
  console.log(this.updateVoterProfile);
  this.http.put(this.url+"updateProfile",this.updateVoterProfile).subscribe(
    (data:any) =>{
        if(data == false)
        {
          window.alert("Profile not update successfully...")
        }
        else
        window.alert("Profile update successfully...")
    }
  )
  
}

voter:Voter;
whatToShow=0;
show(num:number){
  this.whatToShow=num;
}
allCandidateData:Candidate[]=[];
//allCandidateDataOfVillegeElection:CandidateOfVillegeElection[]=[];
// allCandidateData:LoadcandidateOfVillege[]=[];
loadCandidate(){
this.http.get(this.url+"getIsVoted"+this.serv.getServAdharNumber()).subscribe(
  (data:any)=>{
    if(data==1)
    {
      this.isVotedValue=1;
      alert("You voted already......!!")
    }
    else if(data==0){
      this.http.get(this.url+"Loadcandidate"+this.voterServ.getVoter().villege).subscribe(
        (data:any) => {
          console.log(data);
          
          if(data==null)
          window.alert("Exception on server...");
          else
          {
                this.allCandidateData=data;
                console.log(this.allCandidateData);
                //this.allCandidateDataOfVillegeElection=data;
          }
        }
      )
    }
    else
       alert("Exception on server");
  }
)  
}
candidateAdharNumber:number;



isVotedValue:number;
voting(i:number){ 
  console.log(i);
  console.log(this.allCandidateData[i].adharCardNumber);

  // this.cameraAccessAfterVoting=!this.cameraAccessAfterVoting;

  this.http.get(this.url+'voteForCandidate'+this.allCandidateData[i].adharCardNumber).subscribe(
      (data:any)=>{
        if(data==false)
        window.alert("Some Exception On Server!!!!!");
        else
        {
          window.alert("Voting Successfull....");
          this.isVotedValue=1;
          this.cameraAccessAfterVoting=true;//
          this.checkPermmisions(); //
            this.http.get(this.url+"setIsVoted"+this.serv.getServAdharNumber()).subscribe(
              (data:any)=>{
                if(data==true)
                console.log("is voted updated successfully");
                else
                console.log("exception on server");
              }
            )
          }
        }
      )  
    }

    stream:any=null;
    status:any='';
    trigger:Subject<void> = new Subject();
    previewImage: string = '';
    btnLabel:string = "Capture Image";
    cameraAccessAfterVoting:boolean=false;
   
    get $trigger():Observable<void>
    {
      return this.trigger.asObservable();
    }
    snapshot(event:WebcamImage){
      console.log(event);
      this.previewImage = event.imageAsDataUrl
      this.btnLabel = "Retake"
      //this.generateVoterCard();
    }
    

    generateVoterCard() {
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
      });
      
      // Title settings
      const title = "Election Commission of India";
      const titleSize = 22;
      const titleX = pdf.internal.pageSize.getWidth() / 2;
      const titleY = 50;
      
      pdf.setFontSize(titleSize);
      pdf.setFont(undefined, 'bold');
      pdf.text(title, titleX, titleY, { align: 'center' });
      
      // Voter ID card positioning
      const cardY = titleY + 60; // Adjusted for spacing
      const cardWidth = 242.65;
      const cardHeight = 153.54;
      const cardX = (pdf.internal.pageSize.getWidth() - cardWidth) / 2;
      
      pdf.setFillColor(255, 255, 255);
      pdf.rect(cardX, cardY, cardWidth, cardHeight, 'F');
      
      // Photo positioning within the Voter ID card
      const photoWidth = 95.87;
      const photoHeight = 99.22;
      const photoX = cardX + (cardWidth - photoWidth) / 2; // Center the photo within the card
      const photoY = cardY + 10;
      
      pdf.addImage(this.previewImage, 'JPEG', photoX, photoY, photoWidth, photoHeight);
      
      // Setting font size for voter details
      const fontSize = 10;
      pdf.setFontSize(fontSize);
      
      // Voter details
      const voterDetails = {
        name: this.voterServ.getVoter().fullName,
        aadharNumber: this.voterServ.getVoter().adharCardNumber,
        Gender:this.voterServ.getVoter().gender,
        Email_id:this.voterServ.getVoter().email_id,
        state: this.voterServ.getVoter().state,
        district: this.voterServ.getVoter().district,
        villege: this.voterServ.getVoter().villege,
        votingStaus:"Vote successfully Done"
        //age: this.voterServ.getVoter().

      };
      
      // Calculate Y position start for voter details, below the photo
      const detailsStartY = photoY + photoHeight + 20; // Adjust based on needed spacing
      const lineHeight = 20; // Space between lines
      
      // Adding voter details, centered
      Object.entries(voterDetails).forEach(([key, value], index) => {
        const detailText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
        const textWidth = pdf.getStringUnitWidth(detailText) * fontSize / pdf.internal.scaleFactor;
        const textX = (pdf.internal.pageSize.getWidth() - textWidth) / 2; // Centering the text
      
        pdf.text(detailText, textX, detailsStartY + (lineHeight * index));
      });

      // Get current date and time
const now = new Date();

// Format the date and time
// Example: "March 27, 2024, 10:00:00 AM"
const formattedDateTime = now.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
});

// Set font size for date and time
pdf.setFontSize(10);

// Position for date and time (e.g., at the bottom of the page)
const margin = 20; // Margin from the bottom of the page
const pageWidth = pdf.internal.pageSize.getWidth();
const dateTimeX = 10; // X position (10 units from the left)
const dateTimeY = pdf.internal.pageSize.getHeight() - margin; // Y position

// Add formatted date and time to the PDF
pdf.text(formattedDateTime, dateTimeX, dateTimeY);
      
      pdf.save('Voter-ID.pdf');
      
    }
    downloadVoterIdCard(){
      this.generateVoterCard();
    }
    checkPermmisions(){
      navigator.mediaDevices.getUserMedia({
        video:{
          width:500,
          height:500
        }
      }).then((res) =>{
        console.log("response",res);
        this.stream=res;
        this.status='My camera is accessing';
        this.btnLabel = "Capture Image";
      }).catch(err =>{
        console.log(err);
        if(err?.message === 'Permission denied')
        this.status='Permission denied please try again by approving the access.'
        else
        this.status = 'You may not having camera system,please try from another system..'
      })
    }

    captureImage(){
      this.trigger.next();
    }


    showButtons:boolean = false;
    toggleButton(){
      this.showButtons = !this.showButtons;
    }

    showVillegeElectionForm:boolean = false;
    toggleVillegeElectionForm(){
      this.showVillegeElectionForm = !this.showVillegeElectionForm;
    }

    UIVillege:string=this.voterServ.getVoter().villege;
    currentVillegeElection:VillegeElection[]=[];
    LoadCurrentVillegeElections(){
      this.http.get(this.url+"LoadCurrentVillegeElection"+this.UIVillege).subscribe(
        (data:any) => {
          console.log(data);
          this.currentVillegeElection=data;
        }
      )
    }

    

    currentElection:VillegeElection[]=[];
    UIstate:string=this.voterServ.getVoter().state;
    LoadCurrentElection(){
      console.log(this.UIstate);
      
      this.http.get(this.url+"LoadCurrentElection"+this.UIstate).subscribe(
        (data:any) =>{
          this.currentElection=data;
        }
      )
    }
    showForm:boolean = false;
    toggleForm() {
      this.showForm = !this.showForm;
    }

    voterAdharCardNumber:number;
    candidate:Candidate=new Candidate();
    candidateEnroll(){
      if((this.voterAdharCardNumber) === (this.voterServ.getVoter().adharCardNumber))
      {
        this.http.post(this.url+"EnrollCandidateName",this.candidate).subscribe(
          (data:any) => {
            if(data=false)
            window.alert("Exception on server....")
            else{
              window.alert("Enroll successfully.......");
              this.candidate=new Candidate();
            }
          }
        )
      }else
      window.alert("please enter your correct AdharCardNumber....!!!!"); 
    }

    candidateStatus:VillegeElectionOfCandidateStatus=new VillegeElectionOfCandidateStatus();
    UIadharCardNumber:number=this.voterServ.getVoter().adharCardNumber;
    hasClickedApplicationStatus = false;
    getCandidate(){
      this.whetherShowStatus=1;
      this.hasClickedApplicationStatus = true;
        this.http.get(this.url+"getCandidate"+this.UIadharCardNumber).subscribe(
          (data:any) => {
            console.log(data);
           this.candidateServ.setCandidate(data);
           this.candidateStatus=data;
          }
        )
    }  
     
    getVerificationStatus() {
      console.log(this.candidateStatus.isVerified);
     if (this.candidateStatus.isVerified === 1) {
        return 'Accepted';
      } else if (this.candidateStatus.isVerified === 2) {
        return 'Rejected';
      } else if (this.candidateStatus.isVerified === 0) {
        return 'Your application is under process';
      }
      return 'Pending';
    }
    
    whetherShowStatus:number=0;   

// --------------------------------------------------------
registrationForm: FormGroup;
// ngOnInit() {
//   this.registrationForm = this.fb.group({
//     candidateName: ['', Validators.required],
//     adharCardNumber: ['', Validators.required],
//     age: ['', Validators.required],
//     politicalParty: ['', Validators.required]
//   });
// }


  //   selectedFile: File = null;
  //   onFileSelected(event) {
  //     this.selectedFile = event.target.files[0];
  //   }
  //   submit(){
  //     const formData = new FormData();
  // formData.append('imageFile', this.selectedFile, this.selectedFile.name);
  // formData.append('candidateName', this.candidate.candidateName);
  // formData.append('adharCardNumber', this.candidate.adharCardNumber.toString());
  // formData.append('age', this.candidate.age.toString());
  // formData.append('politicalParty', this.candidate.politicalParty);

  //     this.http.post(this.url+"uploadImage", formData).subscribe(
  //       (data:any) =>{
  //        console.log(data);
         
  //       }
  //     )
  //   }
  }
