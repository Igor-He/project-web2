import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { HomePageComponent } from '../home-page/home-page/home-page.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  onSubmit() {
    const username=this.loginForm.controls['username'].value;
    const password=this.loginForm.controls['password'].value;
    const check=this.userService.authentificationUser(username, password);
    if(check==true){
      this.router.navigateByUrl('/home');
    }
  }

  onClear() {
    this.loginForm.reset();
  }
  onRegister(){
    this.router.navigateByUrl('/register');
  }

}
