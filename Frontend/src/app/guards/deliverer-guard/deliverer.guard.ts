import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class DelivererGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.userService.isUserDeliverer() && this.userService.isUserApproved()){
      return true;
    }
      

    this.router.navigate(['/forbidden'], {queryParams: {returnUrl: state.url}});
    return false;
  }
  
}
