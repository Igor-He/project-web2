import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserProfileDto } from 'src/app/_interfaces/user-profile-dto';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  list: UserProfileDto[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDeliverers().subscribe({
      next: (res: UserProfileDto[])=>{
        this.list=res;
      },
      error: (err: HttpErrorResponse)=>{}
    });
    //this.list=this.userService.getDeliverers();
  }
  approveUser(email: string){
    // this.userService.approveUser(id);
    // this.list=this.userService.getDeliverers();
  }

  rejectUser(email: string){
    // this.userService.rejectUser(id);
    // this.list=this.userService.getDeliverers();
  }

  onlyApproved(){
    // this.list=this.userService.approvedUsers();
  }
  all(){
    //this.list=this.userService.getDeliverers();
  }
}
