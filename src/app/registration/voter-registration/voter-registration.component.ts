import { Component } from '@angular/core';
import { Voter } from '../../Model/Voter';
import { HttpClient } from '@angular/common/http';
import { StateData } from 'src/app/Model/StateData';
import { DistrictData } from 'src/app/Model/DistrictData';
import { TalukaData } from 'src/app/Model/TalukaData';
import { VillegeData } from 'src/app/Model/VillegeData';
import { VoterServiceService } from 'src/app/Services/voter-service.service';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-voter-registration',
  templateUrl: './voter-registration.component.html',
  styleUrls: ['./voter-registration.component.css'],
  providers:[VoterServiceService,{provide: NG_VALIDATORS, useExisting: VoterRegistrationComponent, multi: true}]
})
export class VoterRegistrationComponent implements Validators {
  registrationForm: FormGroup;
  constructor(private http:HttpClient,private voterServ:VoterServiceService,private fb:FormBuilder){
    this.http.get(this.url+"getAllStates").subscribe(
      (data:any)=>{
        this.states=data;
      }
    )

    this.registrationForm = new FormGroup({
      pincode: new FormControl('', Validators.required), 
    });

    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      state: ['', Validators.required],
      district: ['', Validators.required],
      taluka: ['', Validators.required],
      village: ['', Validators.required],      
      adharCardNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.confirmPasswordValidator });
  }

    confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password').value;
    const comfirm_password = control.get('confirmPassword').value;
  
    return password === comfirm_password ? null : { passwordMismatch: true };
  };

  // onSubmit() {
  //   console.log(this.registrationForm.value);
  // }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Handle your form submission logic here
    }
  }
  
  //url="http://13.235.113.128:8080/OnlineVotingSystem/";
  url="http://localhost:8080/";



  voterRegister:Voter=new Voter();
  

  confirmPassword:string;
  errorMsg="";
  isErrorShow=0;
  passwordConfirmation(event:any){
    let confirmPassword=event.target.value;
    if(confirmPassword==this.voterRegister.password)
    {
        this.errorMsg="password match";
        this.isErrorShow=1;
    }
    else
    {
      this.errorMsg="password mismatch";
      this.isErrorShow=2;
    }
  }

  
  states:StateData[]=[];
  selectedState:string;
  getAllState(){
    this.http.get(this.url+"getAllStates").subscribe(
      (data:any)=>{
        this.states=data;
      }
    )   
  }

  districts:DistrictData[]=[];
  selectedDistrict:string;
  getAllDistrictInState(){
    this.http.get(this.url+"getAllDistricts"+this.selectedState).subscribe(
      (data:any)=>{
        console.log(data);
        this.districts=data;
        
      }
    )
  }
  

  talukas:TalukaData[]=[];
  selectedTaluka:string;
  getAllTalukaInDistrict(){
    this.http.get(this.url+"getAllTalukas"+this.selectedDistrict).subscribe(
      (data:any)=>{
        console.log(data);
        this.talukas=data
        
      }
    )
  }

  villeges:VillegeData[]=[];
  selectedVillege:string;
  getAllVillegeInTaluka(){
    this.http.get(this.url+"getAllVilleges"+this.selectedTaluka).subscribe(
      (data:any)=>{
        console.log(data);
        this.villeges=data;
       
      }
    )
  }
  

  RegisterVoter(){
    this.voterRegister.state=this.selectedState;
    this.voterRegister.district=this.selectedDistrict;
    this.voterRegister.taluka=this.selectedTaluka;
    this.voterRegister.villege=this.selectedVillege;
    console.log(this.voterRegister);
    
    this.http.get(this.url+"getAllVilleges"+this.selectedTaluka).subscribe(
      (data:any)=>{
        console.log(data);
        this.villeges=data;
      }
    )

    if(this.voterRegister.fullName!=""&&this.voterRegister.gender!=""&&this.voterRegister.email_id!=""&&this.voterRegister.adharCardNumber!=0&&this.voterRegister.mobileNumber!=0&&this.voterRegister.state!=""&&this.voterRegister.villege!=""&&this.voterRegister.password!=""&&this.voterRegister.comfirm_password!="")
  {
    this.http.post(this.url+"register",this.voterRegister).subscribe(
     (data:any) =>{
       if(data==false)
       window.alert("Register Not Successfull.....");
      else{
        window.alert("Voter Register Successfull.....");
        this.voterRegister=new Voter(); 
        this.selectedState='';
        this.selectedDistrict='';
        this.selectedTaluka='';
        this.selectedVillege='';
      }
     } 
    );
  }
  else
  window.alert("some field are blank");
}


}
