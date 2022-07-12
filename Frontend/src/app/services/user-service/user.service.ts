import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Image } from 'src/app/entities/image/image';
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
  path: string="https://localhost:5001/api/users";
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  private typeChangeSub=new Subject<string>()
  public typeChanged=this.typeChangeSub.asObservable();
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
  }

  sendLoginStateChangeNotification (isAuthenticated: boolean){
    this.sendTypeStateChangeNotification(this.getUserType())
    this.authChangeSub.next(isAuthenticated);
  }

  sendTypeStateChangeNotification (change: string){
    this.typeChangeSub.next(change);
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

  isUserDeliverer(): boolean{
    const token = localStorage.getItem("token");
    if(token !==null){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Dostavljac';
    }
    return false;    
  }

  isUserCustomer(): boolean{
    const token = localStorage.getItem("token");
    if(token !==null){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Potrosac';
    }
    return false;    
  }
  getUserType(): string{
    const token = localStorage.getItem("token");
    if(token !==null){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role;
    }
    return "";
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
  public registerUser = (body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (this.path+"/registration", body);
  }

  public uploadPhoto= (formData: FormData)=>{
    return this.http.post('https://localhost:5001/api/images', formData);
  }
  public getPhoto=()=>{
    return this.http.get<Image>('https://localhost:5001/api/images/'+this.getUserId());
  }

  public changePhoto(formData: FormData){
    return this.http.put('https://localhost:5001/api/images/', formData);
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
