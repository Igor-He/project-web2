import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { UserStatus } from 'src/app/entities/enums/user-status.enum';
import { UserType } from 'src/app/entities/enums/user-type.enum';
import { HttpClient } from '@angular/common/http';
import { UserLoginDto } from 'src/app/entities/dtos/user-login-dto';
import { RegistrationResponseDto } from 'src/app/_interfaces/registrationResponseDto.model';
import { UserForRegistrationDto } from 'src/app/_interfaces/userforRegistrationDto.model';
import { LoginResponseDto } from 'src/app/_interfaces/login-response-dto';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfileDto } from 'src/app/_interfaces/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listUsers: Array<User>;
  path: string="https://localhost:5001/api/users";
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
    this.listUsers=new Array<User>();
    this.listUsers=this.loadUsers();
  }

  loadUsers(): any{
    return this.http.get<Array<User>>(this.path);
  }
  mockedUsers(){
    const u1=new User(1,'admin', 'igor@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Administrator, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Approved);
    const u2=new User(2,'del1', 'del1@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u3=new User(3,'del2', 'del2@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u4=new User(4,'del3', 'del3@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u5=new User(5,'del4', 'del4@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u6=new User(6, 'del5', 'del5@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    this.listUsers.push(u1);
    this.listUsers.push(u2);
    this.listUsers.push(u3);
    this.listUsers.push(u4);
    this.listUsers.push(u5);
    this.listUsers.push(u6);
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

  authentificationUser(userLoginDto: UserLoginDto){
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
