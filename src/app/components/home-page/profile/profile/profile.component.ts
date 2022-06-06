import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : User;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    const userUsername = JSON.parse(localStorage.getItem('sessionName') || '{}');
    this.user=this.userService.listUsers.find(x=>x.username==userUsername) || new User();
    
  }  
}
