import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { UserStatus } from 'src/app/entities/enums/user-status.enum';
import { UserType } from 'src/app/entities/enums/user-type.enum';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserForRegistrationDto } from 'src/app/_interfaces/userforRegistrationDto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']

})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  list=new Array<string>();
  errorMessage: string = '';
  showError: boolean;
  selectedFile! : File;
  photoAdded: boolean;
  constructor(private userService:UserService, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.showError = false;
    this.photoAdded=false;
    this.list.push("Potrosač");
    this.list.push("Dostavljač");
    this.initForm();
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'dateOfBirth': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'type': new FormControl("Potrosač", Validators.required),
      'image': new FormControl(),
      'confirm_password' : new FormControl('')
    }
    );
    this.registrationForm.get('confirm_password')?.setValidators([Validators.required, this.userService.validateConfirmPassword(this.registrationForm?.get('password') as FormGroup)]);
  }

  onFileSelected(event : any)
  {
    this.selectedFile = event.target.files[0];
    this.photoAdded=true;

  }
  onSubmit() {
    const username=this.registrationForm.controls['username'].value;
    const email=this.registrationForm.controls['email'].value;
    const password=this.registrationForm.controls['password'].value;
    const name=this.registrationForm.controls['name'].value;
    const surname=this.registrationForm.controls['surname'].value;
    const dateOfBirth=this.registrationForm.controls['dateOfBirth'].value;
    const address=this.registrationForm.controls['address'].value;
    const type=this.registrationForm.controls['type'].value;
    const imagePath=this.registrationForm.controls['image'].value;
    const confirmPassword=this.registrationForm.controls['confirm_password'].value;
    let userStatus;
    let type2;
    if(type=="Dostavljač"){
      type2=UserType.Dostavljac;
      userStatus=UserStatus.Processing;
    }else if(type=="Administrator"){
      type2=UserType.Administrator;
      userStatus=UserStatus.Approved;
    }else {
      type2=UserType.Potrosac;
      userStatus=UserStatus.Approved;
    }
    const user: UserForRegistrationDto = {
      username: username,
      email: email,
      password: password,
      name: name,
      surname: surname,
      dateOfBirth: dateOfBirth,
      address: address,
      type: type2,
      status: userStatus,
      confirmPassword: confirmPassword
    };
    console.log(user);
    this.userService.registerUser(user)
    .subscribe({
      next: (_) => {
        if(this.photoAdded){
          const filedata = new FormData();
          filedata.append(this.selectedFile.name,this.selectedFile);
          filedata.append("id", email);
          this.userService.uploadPhoto(filedata).subscribe({
            next: ()=>{
              this.router.navigateByUrl('/login');
            },
            error: (err: HttpErrorResponse)=>{}
          });
        }else{
          this.router.navigateByUrl('/login');
        }
        
        
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }

  onClear() {
    this.registrationForm.reset();
  }

}
