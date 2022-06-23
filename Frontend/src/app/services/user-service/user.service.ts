import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { UserStatus } from 'src/app/entities/enums/user-status.enum';
import { UserType } from 'src/app/entities/enums/user-type.enum';
import { HttpClient } from '@angular/common/http';
import { RegistrationResponseDto } from 'src/app/_interfaces/registrationResponseDto.model';
import { UserForRegistrationDto } from 'src/app/_interfaces/userforRegistrationDto.model';
import { LoginResponseDto } from 'src/app/_interfaces/login-response-dto';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfileDto } from 'src/app/_interfaces/user-profile-dto';
import { UserForLoginDto } from 'src/app/_interfaces/user-for-login-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listUsers: Array<User>;
  path: string="https://localhost:5001/api/users";
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
  }

  sendLoginStateChangeNotification (isAuthenticated: boolean){
    this.authChangeSub.next(isAuthenticated);
  }

  isUserAuthenticated(): boolean{
    const token=localStorage.getItem("token");
    if(token==null){
      this.sendLoginStateChangeNotification(false);
      return false;
    }else{
      this.sendLoginStateChangeNotification(!this.jwtHelper.isTokenExpired(token));
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  logOut(){
    localStorage.removeItem("token");
    this.sendLoginStateChangeNotification(false);
  }

  authentificationUser(userLoginDto: UserForLoginDto){
    return this.http.post<LoginResponseDto>(this.path+"/login", userLoginDto);
  }

  isUserAdmin(): boolean{
    const token = localStorage.getItem("token");
    if(token !==null){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Administrator';
    }
    return false;    
  }
  getUserById(){
    return this.http.get<UserProfileDto>(this.path+"/"+this.getUserId());
  }
  editUserById(userProfileDto: UserProfileDto ){
    return this.http.put(this.path+"/"+this.getUserId(), userProfileDto);
  }
  approveRejectDeliverer(userProfileDto: UserProfileDto){
    return this.http.put(this.path+"/"+userProfileDto.id, userProfileDto);
  }

  getUserId(): string{
    const token = localStorage.getItem("token");
    if(token !==null){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const id = decodedToken['UserId']
      return id;
    }
    return ""; 
  }


  getDeliverers(){
    return this.http.get<UserProfileDto[]>(this.path+"/all-deliverers");
  }

  approvedUsers(listDeliverers: UserProfileDto[]): UserProfileDto[]{
   let list: UserProfileDto[]= [];
   listDeliverers.forEach(x => {
    if(x.type=="Dostavljac" && x.status=="Approved"){
      list.push(x);
    }
  });
    return list;
  }

   getUserType(userId: number): UserType{
    let type: UserType=UserType.Potrosac;
    this.listUsers.forEach(x => {
      if(x.id==userId){
        type=x.type;
      }
    });
    return type;
  }

  public registerUser = (body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (this.path+"/registration", body);
  }
  public validateConfirmPassword = (passwordControl: AbstractControl): ValidatorFn => {
    return (confirmationControl: AbstractControl) : { [key: string]: boolean } | null => {
      const confirmValue = confirmationControl.value;
      const passwordValue = passwordControl.value;
      if (confirmValue === '') {
          return null;
      }
      if (confirmValue !== passwordValue) {
          return  { mustMatch: true }
      } 
      return null;
    };
  }
}
