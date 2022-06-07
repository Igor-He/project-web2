import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  list: Array<User>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.list=this.userService.getDeliverers();
  }
  approveUser(email: string){
    this.userService.approveUser(email);
    this.list=this.userService.getDeliverers();
  }

  rejectUser(email: string){
    this.userService.rejectUser(email);
    this.list=this.userService.getDeliverers();
  }

  onlyApproved(){
    this.list=this.userService.approvedUsers();
  }
  all(){
    this.list=this.userService.getDeliverers();
  }
}
