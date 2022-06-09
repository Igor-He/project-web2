import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : User;
  updateProfileForm: FormGroup;
  isReadOnly : Boolean;
  isUpdated: Boolean;
  constructor(private userService:UserService) { 
    this.isReadOnly=true;
  }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('sessionId') || '{}');
    this.user=this.userService.listUsers.find(x=>x.id==userId) || new User();
    this.initForm();
  }

  private initForm() {
  this.updateProfileForm = new FormGroup({
    'username': new FormControl(this.user.username, [Validators.required]),
    'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
    'password': new FormControl(this.user.password, [Validators.required]),
    'name': new FormControl(this.user.name, [Validators.required]),
    'surname': new FormControl(this.user.surname, [Validators.required]),
    'dateOfBirth': new FormControl(this.formatDate(this.user.dateOfBirth), [Validators.required]),
    'address': new FormControl(this.user.address, [Validators.required]),
    'type': new FormControl(this.user.type, Validators.required),
    'image': new FormControl()
  }
  );
}
formatDate(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

onEdit(){
  this.isReadOnly=false;
}
onSubmit(){
  const username=this.updateProfileForm.controls['username'].value;
  const email=this.updateProfileForm.controls['email'].value;
  const password=this.updateProfileForm.controls['password'].value;
  const name=this.updateProfileForm.controls['name'].value;
  const surname=this.updateProfileForm.controls['surname'].value;
  const dateOfBirth=this.updateProfileForm.controls['dateOfBirth'].value;
  const address=this.updateProfileForm.controls['address'].value;
  const type=this.updateProfileForm.controls['type'].value;
  // const imagePath=this.updateProfileForm.controls['image'].value;
  const user=new User(this.user.id, username, email, password, name, surname, dateOfBirth, address, type, 'assets/images/Gull_portrait_ca_usa.jpg', this.user.status);
  this.isUpdated=this.userService.editUser(user);
  this.isReadOnly=true;
}
}
