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
  constructor(private userService:UserService, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.showError = false;
    this.list.push(UserType.Potrosac.toString());
    this.list.push(UserType.Dostavljac.toString());
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
      'type': new FormControl(UserType.Potrosac, Validators.required),
      'image': new FormControl(),
      'confirm_password' : new FormControl('')
    }
    );
    this.registrationForm.get('confirm_password')?.setValidators([Validators.required, this.userService.validateConfirmPassword(this.registrationForm?.get('password') as FormGroup)]);
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
    if(type==UserType.Dostavljac){
      userStatus=UserStatus.Processing;
    }else{
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
      type: type,
      status: userStatus,
      confirmPassword: confirmPassword
    };
    this.userService.registerUser(user)
    .subscribe({
      next: (_) => this.router.navigateByUrl('/login'),
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
