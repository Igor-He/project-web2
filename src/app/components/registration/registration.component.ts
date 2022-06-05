import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { UserType } from 'src/app/entities/user-type.enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  list=new Array<string>();
  isRegister=true;
  constructor() { 
    
  }

  ngOnInit(): void {
    this.list.push(UserType.Potrosac.toString());
    this.list.push(UserType.Dostavljac.toString());
    this.list.push(UserType.Administrator.toString());
    this.initForm();
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.email]),
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'dateOfBirth': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'type': new FormControl()
    });
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
    const u=new User(username, email, password, name, surname, dateOfBirth, address, type);
    
  }

  onClear() {
    this.registrationForm.reset();
  }


}
