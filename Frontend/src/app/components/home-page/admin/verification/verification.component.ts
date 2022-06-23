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
  }
  approveUser(user: UserProfileDto){
    user.status="Approved";
    this.userService.approveRejectDeliverer(user).subscribe({
      next: ()=>{
        this.ngOnInit();
      },
      error: (err: HttpErrorResponse)=>{}
    });
  }

  rejectUser(user: UserProfileDto){
    user.status="Reject";
    this.userService.approveRejectDeliverer(user).subscribe({
      next: ()=>{
        this.ngOnInit();
      },
      error: (err: HttpErrorResponse)=>{}
    });
  }

  onlyApproved(){
    this.list=this.userService.approvedUsers(this.list);
  }
  all(){
    this.ngOnInit();
  }
}
