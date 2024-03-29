import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserAuthenticated: boolean;
  userType: string;
  constructor(private userService: UserService, private router: Router) { 
    this.userService.authChanged.subscribe(
      res=>{
        this.isUserAuthenticated=res;
      }
    );
  }

  ngOnInit(): void {
    this.userService.typeChanged.subscribe(
      res=>{
        this.userType=res;
      }
    )
    this.userService.authChanged.subscribe(
      res=>{
        this.isUserAuthenticated=res;
      }
    );
  }

  logOut(){
    this.userService.logOut();
    this.router.navigateByUrl("/login");
  }
}
