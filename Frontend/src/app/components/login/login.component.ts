import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLoginDto } from 'src/app/entities/dtos/user-login-dto';
import { UserService } from 'src/app/services/user-service/user.service';
import { LoginResponseDto } from 'src/app/_interfaces/login-response-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  onSubmit() {
    const email=this.loginForm.controls['email'].value;
    const password=this.loginForm.controls['password'].value;
    this.showError=false;
    const userLoginDto: UserLoginDto={
      email:email,
      password:password
    }
    this.userService.authentificationUser(userLoginDto).subscribe(
     {
      next: (res:LoginResponseDto)=>{
        localStorage.setItem("token", res.token);
        this.router.navigateByUrl('/home');
      },
      error: (err: HttpErrorResponse)=>{
        this.errorMessage=err.message;
        this.showError=true;
      }
     }
   );
  }

  onClear() {
    this.loginForm.reset();
  }
  onRegister(){
    this.router.navigateByUrl('/register');
  }

}
