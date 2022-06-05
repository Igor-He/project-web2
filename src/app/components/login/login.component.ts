import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router) { }

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
    console.log(this.loginForm.value);
    console.log(this.loginForm);
  }

  onClear() {
    this.loginForm.reset();
  }
  onRegister(){
    this.router.navigateByUrl('/register');
  }

}
