import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        console.log(errorMessage);
        return throwError(new Error(errorMessage));
      })
    )
  }

  private handleError = (error: HttpErrorResponse) : any => {
    if(error.status === 404){
      return this.handleNotFound(error);
    }
    else if(error.status === 400){
      return this.handleBadRequest(error);
    }
    else if(error.status === 401) {
      return this.handleUnauthorized(error);
    }
    else if(error.status === 403) {
      return this.handleForbidden(error);
    }
  }
  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  }
  private handleBadRequest = (error: HttpErrorResponse): string => {
    if(this.router.url === '/register'){
      let message = '';
      const values = Object.values(error.error.errors);
      values.map((m: any) => {
        if(typeof(m)=='string')
          message += m + '<br>';
      })
      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
    if(this.router.url === '/login') {
      return 'Authentication failed. Wrong Email or Password';
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
      return error.message;
    }
  }

  private handleForbidden = (error: HttpErrorResponse) => {
    this.router.navigate(["/forbidden"], { queryParams: { returnUrl: this.router.url }});
    return "Forbidden";
  }
}
