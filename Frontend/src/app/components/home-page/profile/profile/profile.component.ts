import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from 'src/app/entities/image/image';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserProfileDto } from 'src/app/_interfaces/user-profile-dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : UserProfileDto;
  updateProfileForm: FormGroup;
  isReadOnly : Boolean;
  isUpdated: Boolean;
  onInit: boolean;
  image: Image;
  selectedFile! : File;
  photoEdit: boolean=false;
  constructor(private userService:UserService) { 
    this.isReadOnly=true;
    this.onInit=false;
  }

  ngOnInit(): void {
    this.photoEdit=false;
    this.userService.getUserById().subscribe({
      next:(res: UserProfileDto)=>{
        this.userService.getPhoto().subscribe({
          next:(data)=>{
            this.user=res;
            this.image=data;
            this.initForm();
            this.onInit=true;
            console.log(data);
          },
          error: (err: HttpErrorResponse)=>{

          }
        });
        
      },
      error: (err: HttpErrorResponse)=>{}
    });
    
  }

  private initForm() {
  this.updateProfileForm = new FormGroup({
    'username': new FormControl(this.user.username, [Validators.required]),
    'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
    'status': new FormControl(this.user.status, [Validators.required]),
    'name': new FormControl(this.user.name, [Validators.required]),
    'surname': new FormControl(this.user.surname, [Validators.required]),
    'dateOfBirth': new FormControl(this.formatDate(this.user.dateOfBirth), [Validators.required]),
    'address': new FormControl(this.user.address, [Validators.required]),
    'type': new FormControl(this.user.type, Validators.required),
    'image': new FormControl()
  }
  );
}
formatDate(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

onEdit(){
  this.isReadOnly=false;
}

onFileSelected(event : any)
  {
    this.selectedFile = event.target.files[0];
    this.photoEdit=true;

  }
onSubmit(){
  const username=this.updateProfileForm.controls['username'].value;
  const email=this.updateProfileForm.controls['email'].value;
  const name=this.updateProfileForm.controls['name'].value;
  const surname=this.updateProfileForm.controls['surname'].value;
  const dateOfBirth=this.updateProfileForm.controls['dateOfBirth'].value;
  const address=this.updateProfileForm.controls['address'].value;
  const type=this.updateProfileForm.controls['type'].value;
  const status=this.updateProfileForm.controls['status'].value;
  const userProfile: UserProfileDto={
    id: this.user.id,
    username: username,
    email: email,
    name: name,
    surname: surname,
    dateOfBirth: dateOfBirth,
    address: address,
    type: type,
    status: status

  };
  this.userService.editUserById(userProfile).subscribe({
    next: ()=>{
      if(this.photoEdit){
        const filedata = new FormData();
        filedata.append(this.selectedFile.name,this.selectedFile);
        filedata.append("id", email);
        this.userService.changePhoto(filedata).subscribe({
          next:()=>{
            window.location.reload();
          },
          error:(err: HttpErrorResponse)=>{}
        });
      }else{
        this.user=userProfile;
      this.isReadOnly=true;
      }
      
    },
    error: (err:HttpErrorResponse)=>{
    }
  });
  // const imagePath=this.updateProfileForm.controls['image'].value;
}
}
