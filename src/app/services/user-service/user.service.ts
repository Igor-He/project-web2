import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { UserStatus } from 'src/app/entities/user-status.enum';
import { UserType } from 'src/app/entities/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listUsers: Array<User>;

  constructor() { 
    this.listUsers=new Array<User>();
    this.mockedUsers();
  }

  loadUsers(): Array<User>{
    return this.listUsers;
  }
  mockedUsers(){
    const u1=new User('admin', 'igor@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Administrator, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Approved);
    const u2=new User('del1', 'del1@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u3=new User('del2', 'del2@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u4=new User('del3', 'del3@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u5=new User('del4', 'del4@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    const u6=new User('del5', 'del5@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Dostavljac, 'assets/images/Gull_portrait_ca_usa.jpg', UserStatus.Processing);
    this.listUsers.push(u1);
    this.listUsers.push(u2);
    this.listUsers.push(u3);
    this.listUsers.push(u4);
    this.listUsers.push(u5);
    this.listUsers.push(u6);
  }

  createUser(u: User){
      this.listUsers.push(u);
  }

  authentificationUser(username: string, password: string): Boolean{
    let check=false;
    this.listUsers.forEach(x => {
      if(x.username==username){
        if(x.password==password){
          check=true;
          if(x.type==UserType.Administrator){
            localStorage.setItem('sessionUserRole', JSON.stringify('ADMIN'));
            localStorage.setItem('sessionName', JSON.stringify(username));
          }
          
        }
      }
    
    });
    return check;
  }
  newUser(user: User): Boolean{
    let check=true;
    this.listUsers.forEach(x => {
      if(x.username==user.username){
        check=false;
      }
    });
    this.createUser(user);
    return check;
  }
  editUser(user: User): Boolean{
    let done=false;
    this.listUsers.forEach(x => {
      if(x.email==user.email){
        let index=this.listUsers.indexOf(x);
        this.listUsers[index]=user;
        done=true;
      }
    });
    return done;
  }
  getDeliverers() : Array<User>{
    let list=new Array<User>();
    this.listUsers.forEach(x => {
      if(x.type==UserType.Dostavljac){
        list.push(x);
      }
    });
    return list;
  }

  approveUser(email: string): boolean{
    let check=false;
    this.listUsers.forEach(x => {
      if(x.email==email){
        let index=this.listUsers.indexOf(x);
        this.listUsers[index].status=UserStatus.Approved;
      }
    });
    return check;
  }
  rejectUser(email: string): boolean{
    let check=false;
    this.listUsers.forEach(x => {
      if(x.email==email){
        let index=this.listUsers.indexOf(x);
        this.listUsers[index].status=UserStatus.Reject;
      }
    });
    return check;
  }
  approvedUsers(): Array<User>{
   let list=new Array<User>();
   this.listUsers.forEach(x => {
    if(x.type==UserType.Dostavljac && x.status==UserStatus.Approved){
      list.push(x);
    }
  });
    return list;
  }

}
