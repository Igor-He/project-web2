import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userType: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userType=this.userService.getUserType();
  }

}
