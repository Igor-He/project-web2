import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project-web2';

  constructor(private userService: UserService){
  }

  ngOnInit(): void {
    if(this.userService.isUserAuthenticated())
      this.userService.sendLoginStateChangeNotification(true);
  }
}
