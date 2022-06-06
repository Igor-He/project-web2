import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user';
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
    const u1=new User('admin', 'igor@gmail.com', 'admin', 'igor', 'hegedis', new Date('3/3/1998'), '123', UserType.Administrator);
    this.listUsers.push(u1);
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
          }
          
        }
      }
    
    });
    return check;
  }
}
