import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

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
    this.userService.authentificationUser(username, password).subscribe(
      (res: any)=>{
        localStorage.setItem('token', res.token);
        console.log(res.token);
        this.toastr.success('You are successfully logged in!');
        this.router.navigateByUrl('/home');
      },
     err=>{
        if(err.status==400)
          this.toastr.error('The username or password is incorrect!');
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
