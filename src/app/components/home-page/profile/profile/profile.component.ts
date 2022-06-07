import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { UserType } from 'src/app/entities/user-type.enum';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : User;
  updateProfileForm: FormGroup;
  isReadOnly=true;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    const userUsername = JSON.parse(localStorage.getItem('sessionName') || '{}');
    this.user=this.userService.listUsers.find(x=>x.username==userUsername) || new User();
    this.initForm();
  }

  private initForm() {
  this.updateProfileForm = new FormGroup({
    'username': new FormControl(this.user.username, [Validators.required]),
    'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
    'password': new FormControl(this.user.password, [Validators.required]),
    'name': new FormControl(this.user.name, [Validators.required]),
    'surname': new FormControl(this.user.surname, [Validators.required]),
    'dateOfBirth': new FormControl(this.user.dateOfBirth, [Validators.required]),
    'address': new FormControl(this.user.address, [Validators.required]),
    'type': new FormControl(this.user.type, Validators.required)
  }
  );
}

onSubmit(){
  this.isReadOnly=false;
}
}
